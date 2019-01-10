import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'

class TextBlockFullWidth extends Component {

    render() {

        const { content, textCenter } = this.props.data

        return (
            <Container className={`${textCenter ? 'text-center' : ''}`}>
                <Row>
                    <Col>
                        <div dangerouslySetInnerHTML={{ __html: content }} />
                    </Col>
                </Row>
            </Container>
        )

    }
}

TextBlockFullWidth.defaultProps = {
    data: {
        textCenter: true
    }
};

export default TextBlockFullWidth
