import React, { Component } from "react"
import Layout from 'components/Layout/Layout'
import {
    Container,
    Row,
    Col
} from 'reactstrap'
import AuditionChildrenForm from 'components/AuditionForm/AuditionChildrenForm'
import AuditionAdultForm from 'components/AuditionForm/AuditionAdultForm'

class RegisterTemplate extends Component {

    render() {
        const data = this.props.data

        return (
            <Layout data={data}>
                <Container fluid className="bg-light-grey py-4">
                    <Row>
                        <Col lg={6} dangerouslySetInnerHTML={{ __html: data.auditionFields.content }} className="position-relative"/>
                        <Col lg={6}>
                            <div className="bg-white p-3 p-md-5">
                                {data.auditionFields.type === 'children' ?
                                    <AuditionChildrenForm data={data.auditionFields} />
                                    :
                                    <AuditionAdultForm data={data.auditionFields} />
                                }
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Layout>
        )
    }
}

export default RegisterTemplate 