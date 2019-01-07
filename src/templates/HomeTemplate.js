import React, { Component } from "react"
import Layout from 'components/Layout/Layout'

class HomeTemplate extends Component {
    render() {
        const data = this.props.data
        return (
            <Layout data={data}>
                <div>
                    <p>{data.title}</p>
                </div>
            </Layout>
        )
    }
}

export default HomeTemplate 