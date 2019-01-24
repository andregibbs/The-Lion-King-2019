import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'

class TwoColumnBlock extends Component {

    render() {

        const { column1, column2, paddingTop } = this.props.data

        let bgColour, containerBgColour = ""
        let padding = "p-3 p-md-5";

        if (paddingTop !== null && paddingTop === false) {
            padding = "pb-3 pl-3 pr-3 pb-md-5 pl-md-5 pr-md-5"
        }

        if (this.props.data.bgColour !== null) {
            bgColour = "bg-" + this.props.data.bgColour
        }

        if (this.props.data.containerBgColour !== null) {
            containerBgColour = "bg-" + this.props.data.containerBgColour
        }

        return (
            <Container fluid className={containerBgColour}>
                <Row className="justify-content-center">
                    <Col lg={6} className="py-3">
                        <div className={`${bgColour} ${padding}`} dangerouslySetInnerHTML={{ __html: column1.content }} />
                    </Col>
                    <Col lg={6} className="py-3">
                        <div className={`${bgColour} ${padding}`} dangerouslySetInnerHTML={{ __html: column2.content }} />
                    </Col>
                </Row>
            </Container>
        )

    }
}

export default TwoColumnBlock
