import path from 'path';

export const createPages = async ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions;

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
        context: { slug },
      });
    });
  }
};
