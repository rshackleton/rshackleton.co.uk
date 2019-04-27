require('dotenv').config();

module.exports = {
  siteMetadata: {
    lang: `en`,
    locale: `en_GB`,
    siteUrl: `https://rshackleton.co.uk`,
    title: `rshackleton.co.uk`,
    twitterUsername: `@shackleberry112`,
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
      resolve: `gatsby-plugin-google-tagmanager`,
      options: {
        id: process.env.GTM_ID,
        includeInDevelopment: false,
        gtmAuth: process.env.GTM_AUTH,
        gtmPreview: process.env.GTM_PREVIEW,
      },
    },
    {
      resolve: `gatsby-plugin-emotion`,
    },
    {
      resolve: `gatsby-plugin-web-font-loader`,
      options: {
        custom: {
          families: ['Raleway:n4,n7', 'Zilla Slab:n4,n7,i4,i7'],
          urls: ['/raleway.css', '/zilla-slab.css'],
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
      resolve: `gatsby-plugin-sitemap`,
    },
    {
      resolve: `gatsby-plugin-robots-txt`,
      options: {
        env: {
          development: {
            policy: [{ userAgent: '*', disallow: ['/'] }],
          },
          production: {
            policy: [{ userAgent: '*', allow: '/' }],
          },
        },
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
