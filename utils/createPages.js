/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

module.exports = async function createPages({ graphql, actions }) {
  await createArticlePages({ graphql, actions });
  await createContentPages({ graphql, actions });
};

/**
 * Create article pages.
 */
async function createArticlePages({ graphql, actions }) {
  const { createPage } = actions;

  const articleTemplate = path.resolve(`src/templates/ArticlePage/index.tsx`);

  const { data, errors } = await graphql(`
    {
      allKontentItemArticle {
        edges {
          node {
            system {
              codename
            }
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
    allKontentItemArticle: { edges },
  } = data;

  edges.forEach(edge => {
    createPage({
      component: articleTemplate,
      path: `articles/${edge.node.elements.slug.value}`,
      context: { slug: edge.node.elements.slug.value },
    });
  });
}

/**
 * Create content pages.
 */
async function createContentPages({ graphql, actions }) {
  const { createPage } = actions;

  const contentTemplate = path.resolve(`src/templates/ContentPage/index.tsx`);

  const { data, errors } = await graphql(`
    {
      allKontentItemContentPage {
        edges {
          node {
            system {
              codename
            }
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
    allKontentItemContentPage: { edges },
  } = data;

  edges.forEach(edge => {
    createPage({
      component: contentTemplate,
      path: `${edge.node.elements.slug.value}`,
      context: { slug: edge.node.elements.slug.value },
    });
  });
}
