import React, { Component } from "react"
import Layout from 'components/Layout/Layout'
import CastCollapse from "components/CastCollapse/CastCollapse";

class CastTemplate extends Component {
    render() {
        const data = this.props.data
        const { siteId } = this.props.data
        return (
            <Layout data={data}>
                <CastCollapse siteId={siteId} />
            </Layout>
        )
    }
}

export default CastTemplate 