/**
 * Resolve the relative URL for the specified node type and slug.
 * @param {String} type
 * @param {String} slug
 */
module.exports = function resolveUrl(type, slug) {
  switch (type) {
    case 'KontentItemArticle':
      return `/articles/${slug}`;

    case 'KontentItemArticleListing':
      return `/articles`;

    case 'KontentItemContactPage':
      return `/${slug}`;

    case 'KontentItemContentPage':
      return `/${slug}`;

    case 'KontentItemHomepage':
      return `/`;

    default:
      return null;
  }
};
