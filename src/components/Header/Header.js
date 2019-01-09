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
						<Img 
							fluid={headerImage.childImageSharp.fluid} 
							className={`${headerImageMobile !== false ? 'd-none d-md-block' : ''}`}
							critical={true}
						 />
					}
					{headerImageMobile !== false &&
						<Img 
							fluid={headerImageMobile.childImageSharp.fluid} 
							className="d-block d-md-none" 
							critical={true}
						/>
					}
				</Container>
				<Navigation siteId={this.props.data.siteId} />
			</header>
		)
	}
}

export default Header