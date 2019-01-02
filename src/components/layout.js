import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'

import Header from './header'
import 'stylesheets/main.scss'

const Layout = ({ displayHeader, children }) => (
	<StaticQuery
		query={graphql`
			query SiteTitleQuery {
				site {
					siteMetadata {
						title
					}
				}
			}
		`}
		render={data => (
			<>
				{ displayHeader == true && 
					<Header siteTitle={data.site.siteMetadata.title} />
				}
				{children}
			</>
		)}
	/>
)

Layout.propTypes = {
	children: PropTypes.node.isRequired,
}

Layout.defaultProps = {
	displayHeader: true
};

export default Layout
