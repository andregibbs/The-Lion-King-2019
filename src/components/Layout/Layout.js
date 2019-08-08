import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SEO from 'components/seo'
import Header from 'components/Header/Header'
import Footer from 'components/Footer/Footer'
import 'stylesheets/main.scss'
import { handleLinkClick } from "js/handleLinkClick"

class Layout extends Component {

	interstitialCheck() {

		// Do not fire following code if already on interstitial
		if (window.location.pathname !== '/interstitial/') {

			// Grab all links
			const links = document.getElementById('site-wrap').getElementsByTagName('a');

			// Loop links
			Array.prototype.forEach.call(links, link => {

				// Skip links that have a class with no-interstitial-check
				if (!link.classList.contains('no-interstitial-check') && link.hasAttribute('href')) {

					// Add event listener to each
					link.addEventListener("click", function (event) {
                        handleLinkClick(event, link);
					});

				}
			})
		}
	}

	tealiumTracking() {
		var pageData = {
			siteName: "thelionking",
			country: "uk",
			region: "emea",
			page_name: this.props.data.title
		};

		if (window !== 'undefined' && window.utag) {
			window.utag.view(pageData)
		}
	}

	componentDidMount() {
		this.interstitialCheck()
		this.tealiumTracking()
	}

	render() {

		const { 
			displayHeader,
			displayFooter,
			displayFooterFindOutMore
		} = this.props

		const { siteId, title, metaDescription, siteName } = this.props.data

		const metaTitle =
			this.props.data.metaTitle || title

		return(
			<>
				<SEO 
					title={metaTitle}
					siteName={siteName} 
					description={metaDescription}
					keywords={[`The Lion King`, `Disney`, `Musical`]} 
				/>
				<div id="site-wrap">
					{displayHeader === true &&
						<Header data={this.props.data} />
					}
					{this.props.children}
					{displayFooter === true &&
						<Footer
							siteId={siteId}
							displayFooterFindOutMore={displayFooterFindOutMore} />
					}
				</div>
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
		displayNav: true,
		title: "Get Tickets for The Lion King from the Official Disney Website",
		metaTitle: "Get Tickets for The Lion King from the Official Disney Website",
		siteName: true
	},
	displayHeader: true,
	displayFooter: true,
	displayFooterFindOutMore: false
};

export default Layout
