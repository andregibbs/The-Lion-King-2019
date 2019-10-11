import React, { Component } from "react"
import Layout from 'components/Layout/Layout'
import ContentBlocks from 'components/ContentBlocks/ContentBlocks'
import AccessTicketsForm from 'components/AccessTicketsForm/AccessTicketsForm'

class RegisterTemplate extends Component {

    render() {
        const data = this.props.data

        return (
            <Layout data={data}>
                <ContentBlocks data={data} />
                <AccessTicketsForm />
            </Layout>
        )
    }
}

export default RegisterTemplate 