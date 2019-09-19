import React, { Component } from "react"
import Layout from 'components/Layout/Layout'
import ContentBlocks from 'components/ContentBlocks/ContentBlocks'

class HomeTemplate extends Component {
    render() {
        const data = this.props.data
        return (
            <Layout data={data} displayFooterFindOutMore={true}>
                <ContentBlocks data={data} />
            </Layout>
        )
    }
}

export default HomeTemplate 