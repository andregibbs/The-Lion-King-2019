import React, { Component } from "react"
import Layout from 'components/Layout/Layout'
import {Row, Col } from 'reactstrap'
import ContentBlocks from 'components/ContentBlocks/ContentBlocks'
import Calendar from 'components/Calendar/Calendar'

class HomeTemplate extends Component {
    render() {
        const data = this.props.data
        return (
            <Layout data={data} displayFooterFindOutMore={true}>
                <Row className="m-0">
                    <Col lg={6}>
                       <ContentBlocks data={data} />
                    </Col>
                    <Col lg={6} className="py-5 py-lg-0">
                       <Calendar />
                    </Col>
                </Row>
            </Layout>
        )
    }
}

export default HomeTemplate 