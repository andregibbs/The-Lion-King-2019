import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'

class TwoColumnBlock extends Component {

    render() {

        const { topContent, column1, column2, paddingTop } = this.props.data
        let { bgColour } = this.props.data

        let containerBgColour = ""
        let padding = "p-3 p-md-5";

        if (topContent !== null) {
            padding = "p-3 pl-md-5 pr-md-5 pb-md-5";
        }

        if (paddingTop !== null && paddingTop === false) {
            padding = "pb-3 pb-md-2 pl-3 pr-3 pl-md-5 pr-md-5"
        }
        
        // Set bg colour
        bgColour = bgColour !== null ? "bg-" + this.props.data.bgColour : ""

        if (this.props.data.containerBgColour !== null) {
            containerBgColour = "bg-" + this.props.data.containerBgColour
        }

        return (
            <Container fluid className={containerBgColour}>
                {topContent !== null &&
                    <div className="pl-3 pr-3 pt-3 pl-md-5 pr-md-5 pt-md-5" dangerouslySetInnerHTML={{ __html: topContent.content }} />
                }
                <Row className="justify-content-center">
                    <Col lg={6} className={`${topContent !== null ? '' : 'py-3' }`}>
                        <div className={`${bgColour} ${padding}`} dangerouslySetInnerHTML={{ __html: column1.content }} />
                    </Col>
                    <Col lg={6} className={`${topContent !== null ? '' : 'py-3'}`}>
                        <div className={`${bgColour} ${padding}`} dangerouslySetInnerHTML={{ __html: column2.content }} />
                    </Col>
                </Row>
            </Container>
        )

    }
}

export default TwoColumnBlock
