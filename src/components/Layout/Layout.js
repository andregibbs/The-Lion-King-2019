import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Header from 'components/Header/Header'
import Footer from 'components/Footer/Footer'
import 'stylesheets/main.scss'

class Layout extends Component {
	render() {

		const { displayHeader, displayFooter } = this.props

		return(
			<>
				{displayHeader === true &&
					<Header data={this.props.data} />
				}
				{this.props.children}
				{displayFooter === true &&
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
	data: {
		headerImage: false,
		headerImageMobile: false
	},
	displayHeader: true,
	displayFooter: true
};

export default Layout
