import React, { Component } from "react"
import { Container, Row, Col } from "reactstrap"

class FooterSocial extends Component {
    render() {
        return (
            <Container>
                <Row className="justify-content-center footer-social">
                    <Col className="col-auto">
                        <a href="https://www.facebook.com/TheLionKingUK" className="p-3" target="_blank" rel="noopener noreferrer">
                            <span className="icon icon-facebook-f"></span>
                            <span className="sr-only">Facebook</span>
                        </a>
                        <a href="https://twitter.com/thelionking" className="p-3" target="_blank" rel="noopener noreferrer">
                            <span className="icon icon-twitter"></span>
                            <span className="sr-only">Twitter</span>
                        </a>
                        <a href="https://www.instagram.com/thelionkinguk/?hl=en" className="p-3" target="_blank" rel="noopener noreferrer">
                            <span className="icon icon-instagram"></span>
                            <span className="sr-only">Instagram</span>
                        </a>
                        <a href="https://www.youtube.com/playlist?list=PL59A1A57EF510F502" className="p-3" target="_blank" rel="noopener noreferrer">
                            <span className="icon icon-youtube"></span>
                            <span className="sr-only">Youtube</span>
                        </a>
                        <a href="//google.com" className="p-3" target="_blank" rel="noopener noreferrer">
                            <span className="icon icon-spotify"></span>
                            <span className="sr-only">Spotify</span>
                        </a>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default FooterSocial