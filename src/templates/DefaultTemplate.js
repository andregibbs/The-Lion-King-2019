import React, { Component } from "react"
import Layout from 'components/Layout/Layout'
import ContentBlocks from 'components/ContentBlocks/ContentBlocks'

class DefaultTemplate extends Component {
    render() {
        const data = this.props.data
        return (
            <Layout data={data}>
                <ContentBlocks data={data} />
            </Layout>
        )
    }
}

export default DefaultTemplate