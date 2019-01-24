import React, { Component } from "react"
import Layout from 'components/Layout/Layout'
import {
    Container,
    Row,
    Col
} from 'reactstrap'
import AuditionForm from 'components/AuditionForm/AuditionForm'

class RegisterTemplate extends Component {
    render() {
        const data = this.props.data

        return (
            <Layout data={data}>
                <Container fluid>
                    <Row>
                        <Col md={6}>

                        </Col>    
                        <Col md={6}>
                            <AuditionForm />
                        </Col>    
                    </Row>    
                </Container>
            </Layout>
        )
    }
}

export default RegisterTemplate 