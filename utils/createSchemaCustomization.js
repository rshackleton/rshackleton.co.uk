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
          const fieldValue = get(source, options.field);
          return fieldValue;
        },
      };
    },
  });

  // Create @map resolver for proxying array values from other fields.
  createFieldExtension({
    name: 'map',
    args: {
      fromField: {
        type: 'String!',
      },
      mapField: {
        type: 'String!',
      },
    },
    extend(options) {
      return {
        resolve(source) {
          const arrayValue = get(source, options.fromField, []);
          return arrayValue
            .map(item => get(item, options.mapField, null))
            .filter(item => !!item);
        },
      };
    },
  });

  // Create @unix resolver for generating unix timestamps from fields.
  createFieldExtension({
    name: 'unix',
    args: {
      field: {
        type: 'String!',
      },
    },
    extend(options) {
      return {
        resolve(source) {
          const fieldValue = get(source, options.field);
          return Math.floor(new Date(fieldValue) / 1000);
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
      modified_unix: Int!
      published: Date
      published_unix: Int
      tags: [String!]
      title: String!
      type: String!
      url: String!
    }

    type KontentItemArticle implements NodeWithUrl & SearchableItem @infer {
      id: ID!
      content: String! @from(field: "elements.body.resolvedData.html")
      modified: Date! @from(field: "system.lastModified")
      modified_unix: Int! @unix(field: "system.lastModified")
      published: Date @from(field: "elements.date.value")
      published_unix: Int @unix(field: "elements.date.value")
      tags: [String!] @map(fromField: "elements.article_tags.value", mapField: "name")
      title: String! @from(field: "elements.title.value")
      type: String! @from(field: "system.type")
      url: String! @url
    }

    type KontentItemContentPage implements NodeWithUrl & SearchableItem @infer {
      id: ID!
      content: String! @from(field: "elements.body.resolvedData.html")
      modified: Date! @from(field: "system.lastModified")
      modified_unix: Int! @unix(field: "system.lastModified")
      published: Date
      published_unix: Int
      tags: [String!]
      title: String! @from(field: "elements.title.value")
      type: String! @from(field: "system.type")
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
