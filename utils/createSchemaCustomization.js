var get = require('lodash/get');

module.exports = ({ actions }) => {
  const { createFieldExtension, createTypes } = actions;

  // Create @from resolver for proxying other fields.
  createFieldExtension({
    name: 'from',
    args: {
      field: {
        type: 'String!',
      },
    },
    extend(options) {
      return {
        resolve(source) {
          return get(source, options.field);
        },
      };
    },
  });

  // Create @url resolver for auto-generating url fields.
  createFieldExtension({
    name: 'url',
    args: {
      slug: {
        type: 'String!',
        defaultValue: 'elements.slug.value',
      },
    },
    extend(options) {
      return {
        resolve(source) {
          const slug = get(source, options.slug);
          const type = get(source, 'internal.type');
          return resolveUrl(type, slug);
        },
      };
    },
  });

  // Create custom schema interfaces and extend types.
  const typeDefs = `
    interface NodeWithUrl @nodeInterface {
      id: ID!
      url: String!
    }

    interface SearchableItem @nodeInterface {
      id: ID!
      content: String!
      modified: Date!
      title: String!
      url: String!
    }

    type KontentItemArticle implements NodeWithUrl & SearchableItem @infer {
      id: ID!
      content: String! @from(field: "elements.body.resolvedData.html")
      modified: Date! @from(field: "system.lastModified")
      title: String! @from(field: "elements.title.value")
      url: String! @url
    }

    type KontentItemContentPage implements NodeWithUrl & SearchableItem @infer {
      id: ID!
      content: String! @from(field: "elements.body.resolvedData.html")
      modified: Date! @from(field: "system.lastModified")
      title: String! @from(field: "elements.title.value")
      url: String! @url
    }
  `;

  createTypes(typeDefs);
};

/**
 * Resolve the relative URL for the specified node type and slug.
 * @param {String} type
 * @param {String} slug
 */
function resolveUrl(type, slug) {
  switch (type) {
    case 'KontentItemArticle':
      return `/articles/${slug}`;

    case 'KontentItemArticleListing':
      return `/articles`;

    case 'KontentItemContactPage':
      return `/${slug}`;

    case 'KontentItemContentPage':
      return `/${slug}`;

    case 'KontentItemHomePage':
      return `/`;

    default:
      return null;
  }
}
