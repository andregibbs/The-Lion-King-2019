import React, { Component } from "react"
import { graphql, StaticQuery } from "gatsby"
import { Container, Row, Col, Modal, ModalBody, ModalHeader, ModalFooter, Button } from "reactstrap"
import Img from 'gatsby-image'
import AboutLink from './AboutLink'

class FooterFindOutMore extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        };

        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal(e) {
        e.preventDefault()
        this.setState({
            modal: !this.state.modal
        });
    }

    render() {
        return (
            <>
                <Container fluid className="bg-image-text">
                    <Row>
                        <Container fluid className="container-max">
                            <BgImages />
                            <Row>
                                <Col md={10} lg={7} xl={6} className="bg-image-text__content">
                                    <div className="w-100">
                                        <h2>
                                            <span>Learn more about</span> <br/>
                                            Disney's THE LION KING
                                        </h2>
                                        <Row className="mt-3">
                                            <AboutLink siteId={this.props.siteId} />
                                        </Row>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </Row>
                </Container>
            </>
        )
    }
}

export default FooterFindOutMore 

export const fluidImage = graphql`
fragment fluidImage on File {
	childImageSharp {
		fluid(maxWidth: 1600) {
			...GatsbyImageSharpFluid
		}
	}
}
`;

const BgImages = () => (
    <StaticQuery
        query={graphql`
			query {
                bgImage: file(relativePath: { eq: "backgrounds/footer-findoutmore-1600px.jpg" }) {
                    ...fluidImage
                }
                bgImageMobile: file(relativePath: { eq: "backgrounds/footer-findoutmore-576px.jpg" }) {
                    ...fluidImage
                }
			}
    	`}
        render={data => (
            <> 
                <Img fluid={data.bgImage.childImageSharp.fluid} className="bg-image-text__img d-none d-md-block" />
                <Img fluid={data.bgImageMobile.childImageSharp.fluid} className="bg-image-text__img d-block d-md-none" />
            </>
        )}
    />
)