module.exports = {
	// pathPrefix: `/v2`,
	siteMetadata: {
		title: `The Lion King`,
		description: `See it now in London. Book tickets here. Coming to Bristol and Edinburgh in 2019. Sign up now.`,
		url: `thelionking.co.uk`,
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
				name: `gatsby-starter-default`,
				short_name: `starter`,
				start_url: `/`,
				background_color: `#663399`,
				theme_color: `#663399`,
				display: `minimal-ui`,
				icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
			},
		},
		// this (optional) plugin enables Progressive Web App + Offline functionality
		// To learn more, visit: https://gatsby.app/offline
		'gatsby-plugin-offline',
	],
}
