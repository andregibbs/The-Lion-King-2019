import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Header from 'components/Header/Header'
import Footer from 'components/Footer/Footer'
import 'stylesheets/main.scss'

class Layout extends Component {
	render() {

		return(
			<>
				{this.props.displayHeader === true &&
					<Header 
						headerImage={this.props.data.headerImage}
						headerImageMobile={this.props.data.headerImageMobile}
					/>
				}
				{this.props.children}
				{this.props.displayFooter === true &&
					<Footer />
				}
			</>
		)
	}
}

Layout.propTypes = {
	children: PropTypes.node.isRequired,
}

Layout.defaultProps = {
	headerImage: false,
	headerImageMobile: false,
	displayHeader: true,
	displayFooter: true
};

export default Layout
