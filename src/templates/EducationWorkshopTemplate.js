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
                                    <h1 className="text-red h3">Education Workshop Application Form</h1>
                                    <p>
                                        Fill in this application form to register your interest in an education workshop for Disney’s
                                        THE LION KING in Bristol this autumn. The workshops will be held on the week of the 14th – 18th October 2019. 
                                    </p>

                                    <p>Workshops give students the chance to learn scenes and choreography directly from the show. They take place in your school and are run by two specially trained Disney Teaching Artists; they cost £12.50 per person.</p>

                                    <p>The closing date for applications is strictly 17th May 2019. All successful schools will be contacted by 23rd May 2019. Payment for the workshops will be required by 5th July 2019.</p>
                                </Col>
                            </Row>
                        </Container>
                    </Row>
                </Container>
                <Container fluid className="bg-pale-yellow py-4">
                    <EducationWorkshopForm />
                </Container>
                <Container className="text-sm pt-4">
                    <h4 className="text-red"><strong>Terms & Conditions</strong></h4>
                    <p>
                        Workshops are 90 minutes in length and cost £12.50 per pupil on top of the ticket price to see the show. They can focus on dancing or acting and can be adapted to suit the needs of the group. Workshops are only available to education groups who are also attending THE LION KING at the Bristol Hippodrome in 2019. Maximum group size for any session is 40 and minimum group size is 20. Minimum age of attendees is 7+. There is no maximum age. 
                    </p>
                    <p>
                        <a href="https://disneyprivacycenter.com/privacy-policy-translations/english/">https://disneyprivacycenter.com/privacy-policy-translations/english/</a>  © Disney. 
                    </p>
                </Container>
            </Layout>
        )
    }
}

export default EducationWorkshopTemplate 