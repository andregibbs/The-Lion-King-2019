import React, { Component } from "react"
import Layout from 'components/Layout/Layout'
import CastCollapse from "components/CastCollapse/CastCollapse";

class CastTemplate extends Component {
    render() {
        const data = this.props.data
        const { parentId } = this.props.data
        return (
            <Layout data={data}>
                <CastCollapse parentId={parentId} />
            </Layout>
        )
    }
}

export default CastTemplate 