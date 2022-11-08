import path from 'path';
import Redis from 'ioredis';

export const createPages = async ({ graphql, actions }) => {
  // console.log(process.env.REDIS_CONNECTION_STRING);

  const redisClient = new Redis(
    `redis://${process.env.REDIS_CONNECTION_STRING}`,
  );
  const testIteration = await redisClient.get('testIteration');

  const { createPage } = actions;

  /*
   * Create page pages
   */
  const pageResult = await graphql(`
    {
      allWpPage {
        nodes {
          slug
          template {
            templateName
          }
        }
      }
    }
  `);

  if (
    pageResult &&
    pageResult.data &&
    pageResult.data.allWpPage &&
    pageResult.data.allWpPage.nodes
  ) {
    pageResult.data.allWpPage.nodes.forEach(({ slug, template }) => {
      createPage({
        path: `/${slug}/`,
        component: path.resolve(`./src/templates/page.js`),
        context: { slug, testIteration },
      });
    });
  }
};
