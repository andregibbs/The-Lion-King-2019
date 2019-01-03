import React, { Component } from "react"
import Layout from 'components/Layout/Layout'

class HomeTemplate extends Component {
    render() {
        const data = this.props.data
        return (
            <Layout
                headerImage={data.headerImage.childImageSharp.fluid}
                headerImageMobile={data.headerImageMobile.childImageSharp.fluid}
            >
                <div>
                    <p>{data.title}</p>
                </div>
            </Layout>
        )
    }
}

export default HomeTemplate 