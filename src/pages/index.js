import React, { Component } from 'react'
import { Link, graphql } from 'gatsby'
import Layout from 'components/Layout/Layout'
import SEO from 'components/seo'
import logo from 'images/logo-nosub.svg'
import lionsHead from 'images/backgrounds/lions-head.png'

class IndexPage extends Component {

	render() {

		// Create list of links for cites
		const locationLinks = this.props.data.allSitesJson.edges.map(({ node }, index) => {
			return (
				<li key={index}>
					<Link to={node.path}>
						{node.title}
					</Link>
				</li>
			)
		})

		return (
			<Layout displayHeader={false} displayFooter={false}>
				<SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
				<div className="p-3 bg-light-grey">
					<div className="container-fluid landing py-3">
						<img src={lionsHead} alt="" className="landing__lion" />
						<div className="row">
							<div className="container">
								<div className="row align-items-center landing__wrap">
									<div className="col-md-6 offset-md-6 col-xl-5 offset-xl-7 text-center">
										<h1>
											<img src={logo} alt="Disney's The Lion King" />
										</h1>
										<h2 className="pt-3">SELECT YOUR REGION</h2>
										<ul className="landing__locations">
											{locationLinks}
										</ul>
									</div>
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
	allSitesJson {
		edges {
			node {
				title
				path
			}
		}
	}
}
`