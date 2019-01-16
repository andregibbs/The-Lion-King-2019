module.exports = {
	// pathPrefix: `/v2`,
	siteMetadata: {
		title: `The Lion King`,
		description: `See it now in London. Book tickets here. Coming to Bristol and Edinburgh in 2019. Sign up now.`,
		url: `https://thelionking.co.uk`,
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
		// this (optional) plugin enables Progressive Web App + Offline functionality
		// To learn more, visit: https://gatsby.app/offline
		'gatsby-plugin-offline',
	],
}
