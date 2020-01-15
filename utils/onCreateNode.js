var crypto = require('crypto');

var resolveUrl = require('./resolveUrl');

module.exports = ({ actions, createNodeId, node }) => {
  const { createNode, createParentChildLink } = actions;

  // Create child searchable item node.
  const searchableItemNode = createSearchableItemNode(node);

  if (!searchableItemNode) {
    return;
  }

  // Create new ID value based on parent ID.
  searchableItemNode.id = createNodeId(`${node.id}__SearchableItem`);

  // Create Gatsby node.
  createNode(searchableItemNode);

  // Create parent/child link.
  createParentChildLink({ parent: node, child: searchableItemNode });
};

/**
 * Create SearchableItem node.
 * @param {Object} node
 */
function createSearchableItemNode(node) {
  const typeFieldData = getTypeSpecificFieldData(node);

  if (!typeFieldData) {
    return null;
  }

  const fieldData = {
    // System fields.
    modified: node.system.lastModified,
    modified_unix: toUnix(node.system.lastModified),
    type: node.system.type,
    url: resolveUrl(node.internal.type, node.elements.slug.value),

    // Element fields.
    ...typeFieldData,
  };

  const searchableItemNode = {
    ...fieldData,

    parent: node.id,
    children: [],
    internal: {
      type: 'SearchableItem',
      contentDigest: crypto
        .createHash(`md5`)
        .update(JSON.stringify(fieldData))
        .digest(`hex`),
    },
  };

  return searchableItemNode;
}

/**
 * Get searchable field data for specific types.
 * @param {Object} node
 */
function getTypeSpecificFieldData(node) {
  switch (node.internal.type) {
    case 'KontentItemArticle':
      return {
        content: node.elements.body.value,
        published: node.elements.date.value,
        published_unix: toUnix(node.elements.date.value),
        tags: node.elements.article_tags.value.map(v => v.name),
        title: node.elements.title.value,
      };

    case 'KontentItemContentPage':
      return {
        content: node.elements.body.value,
        title: node.elements.title.value,
      };

    default:
      return null;
  }
}

/**
 * Convert string date representation to Unix timestamp.
 * @param {String} date
 */
function toUnix(date) {
  return Math.floor(new Date(date) / 1000);
}
