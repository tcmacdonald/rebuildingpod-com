require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

const contentfulConfig = {
  spaceId: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
}

// if you want to use the preview API please define
// CONTENTFUL_HOST in your environment config
// the `host` property should map to `preview.contentful.com`
// https://www.contentful.com/developers/docs/references/content-preview-api/#/reference/spaces/space/get-a-space/console/js
if (process.env.CONTENTFUL_HOST) {
  contentfulConfig.host = process.env.CONTENTFUL_HOST
}

const { spaceId, accessToken } = contentfulConfig

if (!spaceId || !accessToken) {
  throw new Error(
    'Contentful spaceId and the access token need to be provided.'
  )
}

module.exports = {
  siteMetadata: {
    title: 'Rebuilding Podcast',
    titleTemplate: '%s · Rebuilding Podcast',
    description:
      'Join a political satirist and strategist as we discuss hot topics ranging from politics to pop culture, from the perspective of two progressives living in the reddest of red states, Kentucky.',
    url: 'https://www.rebuildingpod.com', // No trailing slash allowed!
    image: '/images/rebuilding-og-logo.png', // Path to your image you placed in the 'static' folder
    twitterUsername: '@rebuildingpod',
  },
  plugins: [
    `gatsby-plugin-netlify`,
    'gatsby-plugin-sass',
    'gatsby-transformer-remark',
    'gatsby-transformer-sharp',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sharp',
    { resolve: `gatsby-source-filesystem`, options: { path: `./src/assets/` } },
    {
      resolve: 'gatsby-source-contentful',
      options: contentfulConfig,
    },
  ],
}
