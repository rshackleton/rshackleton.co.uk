require('dotenv').config();

module.exports = {
  siteMetadata: {
    lang: `en`,
    locale: `en_GB`,
    siteUrl: `https://rshackleton.co.uk`,
    title: `rshackleton.co.uk`,
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
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `rshackleton.co.uk`,
        short_name: `rshackleton.co.uk`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#333333`,
        display: `standalone`,
        icon: `src/assets/favicon.png`,
        include_favicon: true,
      },
    },
    {
      resolve: `gatsby-plugin-offline`,
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GA_TRACKING_ID,
      },
    },
    {
      resolve: `gatsby-plugin-emotion`,
    },
    {
      resolve: `gatsby-plugin-web-font-loader`,
      options: {
        google: {
          families: ['Raleway:400,700', 'Roboto Slab:400,400i,700'],
        },
      },
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
          enablePreviewMode: !!process.env.KC_PREVIEW_KEY,
          previewApiKey: process.env.KC_PREVIEW_KEY,
          projectId: process.env.KC_PROJECT_ID,
        },
        languageCodenames: [`default`],
      },
    },
    {
      resolve: `gatsby-plugin-netlify`,
      options: {
        headers: {
          '/sw.js': ['Cache-Control: no-cache'],
        },
      },
    },
  ],
};
