import Redis from 'ioredis';
import fetch from 'node-fetch';
import { uniq } from 'lodash-es';

export const storeIteration = async (code) => {
  const redisClient = new Redis(`redis://${process.env.REDIS_CONNECTION_STRING}`);
  redisClient.set('testIteration', code);
}

export const checkIfIterationLive = async (code, callbacks = {}) => {
  for (const slug of process.env.GATSBY_TEST_SLUGS.split(',')) {
    const response = await fetch(`${process.env.GATSBY_URL}${slug}`);
    const html = await response.text();

    // if (!html.includes(code)) {
    //   return false;
    // }

    callbacks.onHasCodeCheckingImagesAtSlug && callbacks.onHasCodeCheckingImagesAtSlug(slug);

    // const $ = load(html);
    const imagePaths = html.match(/\/_gatsby\/image\/[\S|"]+/g);

    if (!imagePaths) {
      throw new Error('No image paths found');
    }

    const imageUrls = uniq(imagePaths).map(path => `${process.env.GATSBY_URL}${path.replace(/^\//, '')}`);

    callbacks.onFoundImages && callbacks.onFoundImages(imageUrls.length);

    let i = 1;
    for (const imageUrl of imageUrls) {
      callbacks.onCheckingImage && callbacks.onCheckingImage(imageUrl);

      const imageResponse = await fetch(imageUrl);

      if (!imageResponse.ok) {
        throw new Error(`Image ${imageUrl} not found`);
      }

      callbacks.onFoundImage && callbacks.onFoundImage(imageUrl, i);
      i++;
    }
  }

  return true;
}