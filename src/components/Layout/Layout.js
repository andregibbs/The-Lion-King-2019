import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SEO from 'components/seo'
import Header from 'components/Header/Header'
import Footer from 'components/Footer/Footer'
import { navigate } from 'gatsby'
import 'stylesheets/main.scss'

class Layout extends Component {

	interstitialCheck() {

		// Do not fire following code if already on interstitial
		if (window.location.pathname !== '/interstitial/') {

			// Grab all links
			const links = document.getElementsByTagName('a');

			// Loop links
			Array.prototype.forEach.call(links, link => {

				// Skip links that have a class with no-interstitial-check
				if (!link.classList.contains('no-interstitial-check') && link.hasAttribute('href')) {

					// Add event listener to each
					link.addEventListener("click", function (event) {

						event.preventDefault();

						const element = event.currentTarget;
						const href = element.getAttribute('href')
						const siteUrl = 'thelionking.co.uk'
						const currentUrl = window.location.pathname

						// If href is a for the site itself exit
						if (href.indexOf(siteUrl) > 0 || (href.substring(0, 1) === '/' && href.substring(0, 2) !== '//')) {
							// Proceed with link as normal
							navigate(href);
						} else {
							// Redirect to interstitial with correct state
							navigate("/interstitial/", {
								state: {
									href: href,
									previousUrl: currentUrl,
									accessPage: true
								}
							});
						}

					});

				}
			})
		}
	}

	componentDidMount() {
		this.interstitialCheck()
	}

	render() {

		const { 
			displayHeader, 
			displayFooter, 
			displayFooterFindOutMore
		} = this.props

		const { siteId, title, metaDescription } = this.props.data

		return(
			<>
				<SEO 
					title={title} 
					description={metaDescription}
					keywords={[`The Lion King`, `Disney`, `Musical`]} 
				/>
				{displayHeader === true &&
					<Header data={this.props.data} />
				}
				<h1 className="text-center pt-3 pt-md-4">{this.props.data.title}</h1>
				{this.props.children}
				{displayFooter === true &&
					<Footer 
						siteId={siteId}
						displayFooterFindOutMore={displayFooterFindOutMore} />
				}
			</>
		)
	}
}

Layout.propTypes = {
	children: PropTypes.node.isRequired,
}

Layout.defaultProps = {
	data: {
		headerImage: false,
		headerImageMobile: false,
		title: "Get Tickets for The Lion King from the Official Disney Website"
	},
	displayHeader: true,
	displayFooter: true,
	displayFooterFindOutMore: false
};

export default Layout
