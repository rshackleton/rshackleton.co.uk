require('dotenv').config();

module.exports = {
  siteMetadata: {
    title: `rshackleton.co.uk`,
    siteUrl: `https://rshackleton.co.uk`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-alias-imports`,
      options: {
        alias: {
          '@assets': 'src/assets',
          '@components': 'src/components',
          '@pages': 'src/pages',
          '@templates': 'src/templates',
          '@utils': 'src/utils',
        },
      },
    },
    {
      resolve: `gatsby-plugin-react-helmet`,
    },
    // {
    //   resolve: `gatsby-plugin-manifest`,
    //   options: {
    //     name: `rshackleton.co.uk`,
    //     short_name: `rshackleton.co.uk`,
    //     start_url: `/`,
    //     background_color: `#ffffff`,
    //     theme_color: `#663399`,
    //     display: `standalone`,
    //     icon: `src/assets/favicon.png`,
    //   },
    // },
    // {
    //   resolve: `gatsby-plugin-offline`,
    // },
    // {
    //   resolve: `gatsby-plugin-google-analytics`,
    //   options: {
    //     trackingId: process.env.GA_TRACKING_ID,
    //   },
    // },
    {
      resolve: `gatsby-plugin-emotion`,
    },
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    {
      resolve: `gatsby-source-kentico-cloud`,
      options: {
        deliveryClientConfig: {
          enablePreviewMode: process.env.NODE_ENV !== 'production',
          previewApiKey: process.env.KC_PREVIEW_KEY,
          projectId: process.env.KC_PROJECT_ID,
        },
        languageCodenames: [`default`],
      },
    },
  ],
};
