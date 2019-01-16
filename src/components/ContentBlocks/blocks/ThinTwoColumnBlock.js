import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'

class ThinTwoColumnBlock extends Component {

    render() {

        const { column1, column2 } = this.props.data

        return (
            <Container className="text-center">
                <Row className="justify-content-center pt-3">
                    <Col lg={5} className="px-md-5 py-3">
                        <div dangerouslySetInnerHTML={{ __html: column1.content }} />
                    </Col>
                    <Col lg={5} className="px-md-5 py-3">
                        <div dangerouslySetInnerHTML={{ __html: column2.content }} />
                    </Col>
                </Row>
            </Container>
        )

    }
}

export default ThinTwoColumnBlock
