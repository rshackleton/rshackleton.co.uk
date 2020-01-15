module.exports = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    },
  });
};
