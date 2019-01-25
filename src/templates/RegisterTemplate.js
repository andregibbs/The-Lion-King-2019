import React, { Component } from "react"
import Layout from 'components/Layout/Layout'
import {
    Container,
    Row,
    Col
} from 'reactstrap'
import AuditionChildrenForm from 'components/AuditionForm/AuditionChildrenForm'

class RegisterTemplate extends Component {
    render() {
        const data = this.props.data

        return (
            <Layout data={data}>
                <Container fluid className="bg-light-grey py-4">
                    <Row>
                        <Col lg={6} dangerouslySetInnerHTML={{ __html: data.content }} />
                        <Col lg={6}>
                            <div className="bg-white p-3 p-md-5">
                                <AuditionChildrenForm />
                            </div>
                        </Col>
                    </Row>
                </Container>


            </Layout>
        )
    }
}

export default RegisterTemplate 