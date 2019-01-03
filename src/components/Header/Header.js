import React, { Component } from 'react'
import { Container } from 'reactstrap'
import Img from 'gatsby-image'
import Navigation from 'components/Navigation/Navigation'

class Header extends Component {
	render() {

		const { headerImage, headerImageMobile } = this.props.data

		return (
			<header>
				<Container fluid>
					{headerImage !== false &&
						<Img fluid={headerImage} className={`${headerImageMobile !== false ? 'd-none d-md-block' : ''}`} />
					}
					{headerImageMobile !== false &&
						<Img fluid={headerImageMobile} className="d-block d-md-none" />
					}
				</Container>
				<Navigation />
			</header>
		)
	}
}

export default Header