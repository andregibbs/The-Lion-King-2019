import React, { Component } from "react"
import Layout from 'components/Layout/Layout'
import ContentBlocks from 'components/ContentBlocks/ContentBlocks'
import BookingInfo from '../components/BookingInfo/BookingInfo'

class DefaultTemplate extends Component {
    render() {
        const data = this.props.data
        const { siteId } = this.props.data

        return (
            <Layout data={data}>
                <ContentBlocks data={data} />
                {this.props.data.bookingInfo === null &&
                    <BookingInfo siteId={siteId} />
                }
            </Layout>
        )
    }
}

export default DefaultTemplate