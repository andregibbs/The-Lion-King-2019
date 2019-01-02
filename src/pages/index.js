import React, { Component } from 'react'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
import Layout from 'components/layout'
import SEO from 'components/seo'
import logo from 'images/logo.svg'
import lionsHead from 'images/backgrounds/lions-head.png'

class IndexPage extends Component {

	render() {

		console.log(this.props.data)

		// Create list of links for cites
		const locationLinks = this.props.data.allPagesJson.edges.map(({ node }, index) => {
			return (
				<li>
					<Link to={node.path} key={index}>
						{node.title}
					</Link>
				</li>
			)
		})

		return (
			<Layout displayHeader={false}>
				<SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
				<div className="container-fluid landing py-3">

					<img src={lionsHead} alt="" className="landing__lion" />

					<div className="row">
						<div className="container">
							<div className="row align-items-center landing__wrap">
								<div className="col-md-6 offset-md-6 text-center">

									<h1>
										<img src={logo} alt="Disney's The Lion King" />
									</h1>

									SELECT YOUR REGION

									<ul className="landing__locations">
										{locationLinks}
									</ul>
									
								</div>
							</div>
						</div>
					</div>
				</div>
			</Layout>
		)
	}

}

export default IndexPage


export const landingFluidImage = graphql`
fragment landingFluidImage on File {
	childImageSharp {
		fluid(maxWidth: 1300) {
			...GatsbyImageSharpFluid
		}
	}
}
`;

export const pageQuery = graphql`
query {
	allPagesJson {
		edges {
			node {
				title
				path
			}
		}
	}
}
`