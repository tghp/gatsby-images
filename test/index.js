import dotenv from 'dotenv';
import { generateSlug } from 'random-word-slugs';
import { setTimeout } from 'timers/promises';
import fetch from 'node-fetch';
import pino from 'pino';
import * as colorette from 'colorette';
import logSymbols from 'log-symbols';
import { checkIfIterationLive, storeIteration } from './src/run.js';

dotenv.config();

const logger = (() => {
  const internalLogger = pino({
    level: 'debug',
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: false,
      }
    },
  });

  return {
    info: (message) => internalLogger.info(colorette.white(message)),
    error: (message) => internalLogger.error(colorette.red(message)),
    success: (message) => internalLogger.info(colorette.green(message)),
    warn: (message) => internalLogger.warn(colorette.yellow(message)),
  }
})();

for (const envKey of ['REDIS_CONNECTION_STRING', 'GATSBY_CLOUD_SITE_ID', 'GATSBY_URL', 'GATSBY_TEST_SLUGS']) {
  if (!process.env[envKey]) {
    logger.error(`${envKey} is not set`);
    process.exit(1);
  }
}

// Start a test run
const runSlug = generateSlug();
const runLogPrefix = colorette.gray(`[run: ${runSlug}]`);
logger.info(`${runLogPrefix} Starting test run ${runSlug}`);

let interationIndex = 1;
while (true) {
  // Start a new test run iteration
  let iterationComplete = false;
  while (!iterationComplete) {
    const iterationSlug = generateSlug();
    const iterationLogPrefix = colorette.gray(`${runLogPrefix}[iteration ${interationIndex}: ${iterationSlug}]`);
    logger.info(`${iterationLogPrefix} Starting test iteration ${iterationSlug}`);

    // Store the iteration code in Redis
    await storeIteration(iterationSlug);

    // Wait a short while
    await setTimeout(1000);

    // Trigger a build, with no cache
    const webhookTriggerResponse = await fetch(
      `https://webhook.gatsbyjs.com/hooks/builds/trigger/${process.env.GATSBY_CLOUD_SITE_ID}`,
      {
        method: 'POST',
        headers: {
          'X-Gatsby-Cache': 'false',
        },
      }
    );

    // If the webhook failed, trigger an error as something is probably broken
    if (webhookTriggerResponse.status < 200 || webhookTriggerResponse.status > 299) {
      logger.error(`${iterationLogPrefix} Webhook trigger failed with status ${webhookTriggerResponse.status}`);
      process.exit(1);
    }

    let iterationLive = false;
    while (!iterationLive) {
      try {
        // ...Check if the iteration is live, while looking for missing images
        const iterationLiveCheck = await checkIfIterationLive(iterationSlug, {
          onHasCodeCheckingImagesAtSlug: (slug) => {
            logger.info(`${iterationLogPrefix} ${logSymbols.success} Iteration has code, checking images at /${slug}`);
          },
          onFoundImages: (imageCount) => {
            logger.info(`${iterationLogPrefix} ${logSymbols.success} Found ${imageCount} images`);
          },
          onCheckingImage: (imageUrl) => {
            logger.info(`${iterationLogPrefix} Checking image`);
          },
          onFoundImage: (imageUrl, index) => {
            logger.success(`${iterationLogPrefix} Found image ${index}: ${imageUrl.substring(imageUrl.length - 200, imageUrl.length)}`);
          },
        });

        if (iterationLiveCheck) {
          logger.success(`${iterationLogPrefix} ${logSymbols.success} Images fine, starting new iteration`);
          iterationLive = true;
        } else {
          logger.warn(`${iterationLogPrefix} ${logSymbols.warning} Iteration not live yet`);

          // After a short while, check if the iteration is live...
          await setTimeout(10000);
        }
      } catch (error) {
        logger.error(`${iterationLogPrefix} ${logSymbols.error} ${error.message}`);
        process.exit(1);
      }
    }

    iterationComplete = true;
    interationIndex++;
  }
}