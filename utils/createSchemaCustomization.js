const get = require('lodash/get');

const resolveUrl = require('./resolveUrl');

module.exports = ({ actions }) => {
  const { createFieldExtension, createTypes } = actions;

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
    type SearchableItem implements Node @dontInfer {
      id: ID!
      content: String!
      modified: Date! @dateformat
      modified_unix: Int!
      published: Date @dateformat
      published_unix: Int
      summary: String!
      tags: [String!]
      title: String!
      type: String!
      url: String!
    }

    interface NodeWithUrl @nodeInterface {
      id: ID!
      url: String!
    }

    type KontentItemArticle implements NodeWithUrl @infer {
      id: ID!
      url: String! @url
    }

    type KontentItemContentPage implements NodeWithUrl @infer {
      id: ID!
      url: String! @url
    }
  `;

  createTypes(typeDefs);
};
