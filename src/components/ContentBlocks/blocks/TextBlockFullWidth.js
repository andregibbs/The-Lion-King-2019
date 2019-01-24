import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'

class TextBlockFullWidth extends Component {

    render() {

        const { fluidContainer, content, textCenter } = this.props.data

        return (
            <Container 
                fluid={fluidContainer !== null && fluidContainer === true ? true : false }
                className={`${textCenter !== false ? 'text-center' : ''}`}>
                <div className={`${fluidContainer !== null && fluidContainer === true ? 'p-3 p-md-5' : ''}`}>
                    <Row>
                        <Col className="pb-5">
                            <div dangerouslySetInnerHTML={{ __html: content }} />
                        </Col>
                    </Row>
                </div>
            </Container>
        )

    }
}

export default TextBlockFullWidth
