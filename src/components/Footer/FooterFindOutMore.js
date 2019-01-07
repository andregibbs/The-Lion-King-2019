import React, { Component } from "react"
import { graphql, Link, StaticQuery } from "gatsby"
import { Container, Row, Col, Modal, ModalBody, ModalHeader, ModalFooter, Button } from "reactstrap"
import Img from 'gatsby-image'

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
                                            <Col md={6}>
                                                <Link to="/about" className="btn btn--red btn--block btn--large">
                                                    <span>Find out more</span>
                                                </Link>
                                            </Col>
                                            <Col md={6} className="mt-2 mt-md-0">
                                                <a href="#" onClick={this.toggleModal} className="btn btn--red btn--block btn--large">
                                                    <span>Watch trailer</span>
                                                </a>
                                            </Col>
                                        </Row>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </Row>
                </Container>
                <Modal isOpen={this.state.modal} toggle={this.toggleModal} centered={true} size="xl">
                    <ModalHeader toggle={this.toggleModal}>Modal title</ModalHeader>
                    <ModalBody>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggleModal}>Do Something</Button>{' '}
                        <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
                    </ModalFooter>
                </Modal>
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