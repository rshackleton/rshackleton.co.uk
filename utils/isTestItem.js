var get = require('lodash/get');

/** Check if node is a test node and shouldn't be shown on the website. */
module.exports = node => {
  const codename = get(node, 'system.codename');
  return codename && codename.indexOf('test_') === 0;
};
