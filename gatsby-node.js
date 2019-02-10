var path = require('path');

exports.createPages = async function createPages({ graphql, actions }) {
  await createArticlePages({ graphql, actions });
};

/**
 * Create article pages.
 */
async function createArticlePages({ graphql, actions }) {
  const { createPage } = actions;

  const articleTemplate = path.resolve(`src/templates/article-page.jsx`);

  const { data, errors } = await graphql(`
    {
      allKenticoCloudItemArticle {
        edges {
          node {
            id
            elements {
              slug {
                value
              }
            }
          }
        }
      }
    }
  `);

  if (errors) {
    throw errors;
  }

  const {
    allKenticoCloudItemArticle: { edges },
  } = data;

  edges.forEach(edge => {
    createPage({
      component: articleTemplate,
      path: `articles/${edge.node.elements.slug.value}`,
      context: { slug: edge.node.elements.slug.value },
    });
  });
}
