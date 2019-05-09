import React, { Component } from 'react'
import { Link, graphql } from 'gatsby'
import Layout from 'components/Layout/Layout'
import logo from 'images/logo-nosub.svg'
// import lionsHead from 'images/backgrounds/lionhead.png'
import { Container, Row, Col } from 'reactstrap'


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
	

		const data = []
		data.siteName = false
		data.title = "Get Tickets for The Lion King from the Official Disney Website"
		data.metaDescription = "See it now in London. Book tickets here. Coming to Bristol and Edinburgh in 2019. Sign up now."

		return (
			<Layout displayHeader={false} displayFooter={false} data={data}>
				<div className="p-3 bg-light-grey">
					<Container fluid className="landing py-3">
						{/* <img src={lionsHead} alt="" className="landing__lion" /> */}
						<Row>
							<Container>
								<Row className="align-items-center landing__wrap">
									<Col className="col-lg-6 offset-lg-3 offset-xl-6 col-xl-5 offset-xl-7 text-center">
										<h1>
											<img src={logo} alt="Disney's The Lion King" />
										</h1>
										<h2 className="pt-3">SELECT YOUR REGION</h2>
										<ul className="landing__locations">
											{locationLinks}

											<li>
                                                <Link to="/relaxedperformances/" className="text-lg">
                                                    All Relaxed Performances
                                                </Link>
                                            </li>
                                            <li>
                                                <a href="https://disney.co.uk/shows/the-lion-king-musical-tour-tickets" rel="noopener noreferrer" target="_blank" className="no-interstitial-check text-lg">
                                                    Other cities – sign up
                                                </a>
                                            </li>
										</ul>
									</Col>
								</Row>
							</Container>
						</Row>
					</Container>
				</div>
			</Layout>
		)
	}

}

export default IndexPage


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