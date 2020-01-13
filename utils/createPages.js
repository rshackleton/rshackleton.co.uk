var path = require('path');
var isTestItem = require('./isTestItem');

module.exports = async function createPages({ graphql, actions }) {
  await createArticlePages({ graphql, actions });
  await createContentPages({ graphql, actions });
};

/**
 * Create article pages.
 */
async function createArticlePages({ graphql, actions }) {
  const { createPage } = actions;

  const articleTemplate = path.resolve(`src/templates/article-page.tsx`);

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
    if (isTestItem(edge.node)) {
      console.log(`Skipped node ${edge.node.system.codename}`);
      return;
    }

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

  const contentTemplate = path.resolve(`src/templates/content-page.tsx`);

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
    if (isTestItem(edge.node)) {
      console.log(`Skipped node ${edge.node.system.codename}`);
      return;
    }

    createPage({
      component: contentTemplate,
      path: `${edge.node.elements.slug.value}`,
      context: { slug: edge.node.elements.slug.value },
    });
  });
}
