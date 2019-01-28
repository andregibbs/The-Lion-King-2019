import React from "react"
import { Container, Row, Col } from "reactstrap"
import Img from 'gatsby-image'
import { StaticQuery, graphql } from 'gatsby'


const FooterLinks = () => (
    <StaticQuery
        query={graphql`
            query {
                footerImage1: file(relativePath: { eq: "footer-aladdin-800px.jpg" }) {
                    ...footerFluidImage
                }
                footerImage2: file(relativePath: { eq: "footer-mary-800px.jpg" }) {
                    ...footerFluidImage
                }
            }
		`}
        render={data => (
            <Container fluid className="container-max footer-images">
                <Row>
                    <Col md={6}>
                        <a href="https://aladdinthemusical.co.uk/" target="_blank" rel="noreferrer noopener" className="footer-images__link no-interstitial-check">
                            <Img fluid={data.footerImage1.childImageSharp.fluid} alt="Aladdin The Musical" />
                        </a>
                    </Col>
                    <Col md={6}>
                        <a href="https://disney.co.uk/shows/mary-poppins-musical-tickets" target="_blank" rel="noreferrer noopener" className="footer-images__link no-interstitial-check">
                            <Img fluid={data.footerImage2.childImageSharp.fluid} alt="Disney Store" />
                        </a>
                    </Col>
                </Row>
            </Container>
        )}
    />
)

export default FooterLinks


export const fluidImage = graphql`
fragment footerFluidImage on File {
	childImageSharp {
		fluid(maxWidth: 800) {
			...GatsbyImageSharpFluid
		}
	}
}
`;