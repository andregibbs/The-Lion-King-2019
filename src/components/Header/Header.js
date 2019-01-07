import React, { Component } from 'react'
import { Container } from 'reactstrap'
import Img from 'gatsby-image'
import Navigation from 'components/Navigation/Navigation'
import { throws } from 'assert';

class Header extends Component {
	render() {

		const { headerImage, headerImageMobile } = this.props.data

		return (
			<header>
				<Container fluid>
					{headerImage !== false &&
						<Img fluid={headerImage.childImageSharp.fluid} className={`${headerImageMobile !== false ? 'd-none d-md-block' : ''}`} />
					}
					{headerImageMobile !== false &&
						<Img fluid={headerImageMobile.childImageSharp.fluid} className="d-block d-md-none" />
					}
				</Container>
				<Navigation parentId={this.props.data.parentId} />
			</header>
		)
	}
}

export default Header