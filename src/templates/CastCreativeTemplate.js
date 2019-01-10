import React, { Component } from "react"
import Layout from 'components/Layout/Layout'
import CastCreativeCollapse from "components/CastCreativeCollapse/CastCreativeCollapse";
import BookingInfo from "../components/BookingInfo/BookingInfo";

class CastTemplate extends Component {
    render() {
        const data = this.props.data
        const { siteId } = this.props.data

        return (
            <Layout data={data}>
                <CastCreativeCollapse siteId={siteId} />
                <BookingInfo siteId={siteId} />
            </Layout>
        )
    }
}

export default CastTemplate 