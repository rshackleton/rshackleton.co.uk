require('dotenv').config();

module.exports = {
  siteMetadata: {
    description: '',
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
      resolve: `gatsby-plugin-ts`,
      options: {
        codegen: false,
        forkTsCheckerPlugin: {
          eslint: true,
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
      resolve: `@kentico/gatsby-source-kontent`,
      options: {
        deliveryClientConfig: {
          projectId: process.env.KC_PROJECT_ID,
          typeResolvers: [],
          previewApiKey: process.env.KC_PREVIEW_KEY,
          globalQueryConfig: {
            usePreviewMode: !!process.env.KC_PREVIEW_KEY,
          },
        },
        languageCodenames: [`default`],
      },
    },
    {
      resolve: `@rshackleton/gatsby-transformer-kontent-image`,
      options: {
        local: false,
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
    {
      resolve: `gatsby-plugin-disqus`,
      options: {
        shortname: process.env.DISQUS_SHORTNAME,
      },
    },
    {
      resolve: `gatsby-plugin-algolia`,
      options: {
        appId: process.env.ALGOLIA_APP_ID,
        apiKey: process.env.ALGOLIA_API_KEY,
        indexName: process.env.ALGOLIA_INDEX_NAME,
        queries: [
          {
            query: `
              {
                allSearchableItem {
                  edges {
                    node {
                      objectID: id
                      content
                      modified
                      modified_unix
                      published
                      published_unix
                      summary
                      title
                      type
                      url
                      _tags: tags
                    }
                  }
                }
              }
            `,
            settings: {
              attributesToSnippet: [`summary:20`],
              customRanking: ['desc(published_unix)'],
              searchableAttributes: [
                'title',
                'content',
                'summary',
                '_tags',
                'type',
              ],
            },
            transformer: ({ data }) =>
              data.allSearchableItem.edges.map(({ node }) => node),
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allKontentItemArticle } }) => {
              return allKontentItemArticle.edges.map(edge => {
                return Object.assign({}, edge.node, {
                  title: edge.node.elements.metadata__page_title.value,
                  description:
                    edge.node.elements.metadata__page_description.value,
                  date: edge.node.elements.date.value,
                  pubDate: edge.node.elements.date.value,
                  url: site.siteMetadata.siteUrl + edge.node.url,
                  guid: site.siteMetadata.siteUrl + edge.node.url,
                  custom_elements: [
                    {
                      'content:encoded':
                        edge.node.elements.body.resolvedData.html,
                    },
                  ],
                });
              });
            },
            query: `
              {
                allKontentItemArticle(sort: { fields: elements___date___value, order: DESC }) {
                  edges {
                    node {
                      elements {
                        body {
                          resolvedData {
                            html
                          }
                        }
                        date {
                          value
                        }
                        metadata__page_title {
                          value
                        }
                        metadata__page_description {
                          value
                        }
                        metadata__page_keywords {
                          value
                        }
                      }
                      url
                    }
                  }
                }
              }
            `,
            output: '/rss.xml',
            title: 'Articles from Richard Shackleton',
          },
        ],
      },
    },
  ],
};
