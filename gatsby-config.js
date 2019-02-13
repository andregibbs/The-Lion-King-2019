require("dotenv").config({
	path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
	// pathPrefix: `/v2`,
	siteMetadata: {
		title: `The Lion King`,
		description: `See it now in London. Book tickets here. Coming to Bristol and Edinburgh in 2019. Sign up now.`,
		siteUrl: `https://thelionking.co.uk`,
		author: `Disney`
	},
	plugins: [
		'gatsby-plugin-resolve-src',
		`gatsby-plugin-react-helmet`,
		`gatsby-transformer-json`,
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				path: `${__dirname}/src/data/`,
			},
		},
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `images`,
				path: `${__dirname}/src/images`,
			},
		},
		{
			resolve: `gatsby-plugin-sass`,
			options: {
				precision: 8,
			},
		},
		{
			resolve: `gatsby-plugin-canonical-urls`,
			options: {
				siteUrl: 'https://www.thelionking.co.uk'
			},
		},
		`gatsby-transformer-sharp`,
		`gatsby-plugin-sharp`,
		{
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: `The Lion King`,
				short_name: `The Lion King`,
				start_url: `/`,
				background_color: `#ffd000`,
				theme_color: `#c42719`,
				display: `minimal-ui`,
				icon: `src/images/tlk-icon.png`, // This path is relative to the root of the site.
			},
		},
		{
			resolve: `gatsby-plugin-sitemap`,
			options: {
				output: `/sitemap.xml`,
				// Exclude specific pages or groups of pages using glob parameters
				// See: https://github.com/isaacs/minimatch
				// The example below will exclude the single `path/to/page` and all routes beginning with `category`
				exclude: ["/interstitial/"],
				query: `
				{
					site {
						siteMetadata {
							siteUrl
						}
					}
			
					allSitePage {
						edges {
							node {
								path
							}
						}
					}
				}`
			}
		},
		{
			resolve: `gatsby-plugin-google-tagmanager`,
			options: {
				id: "GTM-3DTR6X",

				// Include GTM in development.
				// Defaults to false meaning GTM will only be loaded in production.
				includeInDevelopment: false,

				// Specify optional GTM environment details.
				// gtmAuth: "YOUR_GOOGLE_TAGMANAGER_ENVIROMENT_AUTH_STRING",
				// gtmPreview: "YOUR_GOOGLE_TAGMANAGER_ENVIROMENT_PREVIEW_NAME",
			},
		},
		// {
		// 	resolve: 'gatsby-plugin-robots-txt',
		// 	options: {
		// 		host: 'https://thelionking.co.uk',
		// 		sitemap: 'https://thelionking.co.uk/sitemap.xml',
		// 		resolveEnv: () => process.env.GATSBY_ENV,
		// 		env: {
		// 			development: {
		// 				policy: [{ userAgent: '*', disallow: ['/'] }]
		// 			},
		// 			production: {
		// 				policy: [{ userAgent: '*', allow: '/' }]
		// 			}
		// 		}
		// 	}
		// },
		// this (optional) plugin enables Progressive Web App + Offline functionality
		// To learn more, visit: https://gatsby.app/offline
		'gatsby-plugin-offline',
	],
}
