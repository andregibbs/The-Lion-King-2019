import React, { Component } from "react"
import { 
    Container, 
    Row, 
    Col 
} from 'reactstrap';

import Layout from 'components/Layout/Layout'
import HouseSeatsForm from 'components/HouseSeatsForm/HouseSeatsForm'

class HouseSeatsTemplate extends Component {

    render() {
        const data = this.props.data

        return (
            <Layout data={data}>
                <Container fluid className="bg-light-grey py-4">
                    <Row>
                        <Col lg={6}>
                            <div className="bg-white p-3 p-md-5">
                                <h2 className="text-red font-special font-special--spacing">LONDON</h2>
                                <p className="text-lg">The production holds a very limited number of top price seats for every performance, which are not available to the general public. Seats are subject to availability and requests will be reviewed and prioritised accordingly. Please note that filling out the request form is not a guarantee of tickets. Tickets are priced between £69.50 - £72.50 dependant on performance.</p>
                                <hr className="hr-black my-4" />
                                <p className="text-red text-lg"><strong>Performance schedule</strong></p>
                                <p><strong>Evenings:</strong> Tuesday - Saturday at 7.30pm<br />
                                    <strong>Matinees:</strong> Wednesday, Saturday & Sunday at 2.30pm.</p>
                                <hr className="hr-black my-4" />
                                <p className="text-lg">To request House Seats for Disney's THE LION KING in London please complete the form. Once your request has been processed you will receive a confirmation email with reservation details. You will then need to call the box office and provide your credit card details to complete your booking. If you have any access requirements, please use the Additional Notes box.</p>
                                <p className="text-red"><strong>PLEASE NOTE THAT YOUR REQUEST MAY TAKE UP TO ONE WEEK PRIOR TO THE PERFORMANCE DATE TO BE CONFIRMED.</strong></p>
                                <p><strong>Performance prices, dates and times subject to change without notice. Black-out periods may apply. Subject to availability. No refunds/exchanges.</strong></p>
                            </div>
                        </Col>
                        <Col lg={6}>
                            <div className="bg-white p-3 p-md-5">
                                <HouseSeatsForm />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Layout>
        )
    }
}

export default HouseSeatsTemplate