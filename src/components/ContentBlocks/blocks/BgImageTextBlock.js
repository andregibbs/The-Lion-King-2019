import React, { Component } from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import { Container, Row, Col } from 'reactstrap'

class BgImgWithText extends Component {

    render() {

        const { imgDesktop, imgMobile, text, links } = this.props.data

        let linkButtons

        if (links !== undefined && links.length) {
            linkButtons = links.map((link, i) => {

                if (link.external !== undefined) {
                    return (
                        <Col md={6} key={i} className="pr-md-1">
                            <a href={link.url} target="_blank" rel="noopener noreferrer" className="btn btn--white btn--block mb-2 mb-md-0">{link.text}</a>
                        </Col>
                    )
                } else {
                    return (
                        <Col md={6} key={i} className="pr-md-1">
                            <Link to={link.url} className="btn btn--white btn--block mb-2 mb-md-0">{link.text}</Link>
                        </Col>
                    )
                }
            })
        }

        return (
            <Container fluid className="bg-image-text">
                <Row>
                    <Container fluid className="container-max">
                        <Img fluid={imgDesktop.childImageSharp.fluid} className="bg-image-text__img d-none d-lg-block" />
                        <Img fluid={imgMobile.childImageSharp.fluid} className="bg-image-text__img d-block d-lg-none" />
                        <Row>
                            <Col lg={8} xl={6} className="bg-image-text__content">
                                <div>
                                    <div dangerouslySetInnerHTML={{ __html: text }} />
                                    {linkButtons !== "" &&
                                        <Row className="mt-4">
                                            {linkButtons}
                                        </Row>
                                    }
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </Row>
            </Container>
        )
    }
}

export default BgImgWithText