import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'

class TextBlockFullWidth extends Component {

    render() {

        const { fluidContainer, content, textCenter } = this.props.data
        let { paddingClass } = this.props.data

        if (paddingClass === undefined) paddingClass = "pb-5"

        return (
            <Container 
                fluid={fluidContainer !== null && fluidContainer === true ? true : false }
                className={`${textCenter !== false ? 'text-center' : ''}`}>
                <div className={`${fluidContainer !== null && fluidContainer === true ? 'p-3 p-md-5' : ''}`}>
                    <Row>
                        <Col className={paddingClass}>
                            <div dangerouslySetInnerHTML={{ __html: content }} />
                        </Col>
                    </Row>
                </div>
            </Container>
        )

    }
}

export default TextBlockFullWidth
