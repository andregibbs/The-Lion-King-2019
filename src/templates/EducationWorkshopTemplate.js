import React, { Component } from "react"
import Layout from 'components/Layout/Layout'
import {
    Container,
    Row,
    Col
} from 'reactstrap'
import EducationWorkshopForm from 'components/EducationWorkshopForm/EducationWorkshopForm'

class EducationWorkshopTemplate extends Component {
    render() {
        const data = this.props.data

        return (
            <Layout data={data}>
                <Container fluid className="bg-light-grey py-4">
                    <Row>
                        <Container>
                            <Row>
                                <Col lg={6}>
                                    <h1 class="text-red h3">Education Workshop Application Form</h1>
                                    <p>
                                        Fill in this application form to register your interest in an education workshop for Disney’s
                                        THE LION KING in Bristol this autumn. The workshops will be held on the week of the 14th – 18th October 2019. 
                                    </p>

                                    <p>Workshops give students the chance to learn scenes and choreography directly from the show. They take place in your school and are run by two specially trained Disney Teaching Artists. </p>

                                    <p>The closing date for applications is strictly 17th May 2019. All successful schools will be contacted by 23rd May 2019. Payment for the workshops will be required by 5th July 2019.</p>
                                </Col>
                            </Row>
                        </Container>
                    </Row>
                </Container>
                <Container fluid className="bg-pale-yellow py-4">
                    <EducationWorkshopForm />
                </Container>
            </Layout>
        )
    }
}

export default EducationWorkshopTemplate 