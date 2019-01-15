import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'

class TwoColumnBlock extends Component {

    render() {

        const { column1, column2 } = this.props.data

        let bgColour
        const padding = "p-5";

        console.log(this.props.data)

        if (this.props.data.bgColour !== null) {
            bgColour = "bg-" + this.props.data.bgColour
        }

        return (
            <Container fluid>
                <Row className="justify-content-center pt-3">
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
