import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'

class TextBlockFullWidth extends Component {

    render() {

        const { content, textCenter } = this.props.data

        return (
            <Container className={`${textCenter !== false ? 'text-center' : ''}`}>
                <Row>
                    <Col className="py-5">
                        <div dangerouslySetInnerHTML={{ __html: content }} />
                    </Col>
                </Row>
            </Container>
        )

    }
}

export default TextBlockFullWidth
