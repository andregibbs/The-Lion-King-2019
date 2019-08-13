import React, { Component } from "react"
import Layout from 'components/Layout/Layout'
import { Row, Col } from 'reactstrap'
import ContentBlocks from 'components/ContentBlocks/ContentBlocks'
import Calendar from 'components/Calendar/Calendar'

class HomeTemplate extends Component {
    render() {
        const data = this.props.data
        return (
            <Layout data={data} displayFooterFindOutMore={true}>
                <Row className="m-0">
                    <Col lg={6}>

                        <div class="text-center container">
                            <div class="">
                                <div class="row">
                                    <div class="pb-0 col">
                                        <h1 class="h4 font-weight-bold">
                                            <span class="text-red">Bristol Hippodrome</span> <br /><span class="mobile-title">7 September – 23 November 2019</span></h1>
                                        <h5>Good seats still available for performances in November</h5>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="text-center container">
                            <div class="">
                                <div class="row">
                                    <div class="pb-0 col">
                                        <div>
                                            <a href="https://www.atgtickets.com/shows/lion-king-bristol/bristol-hippodrome/" class="btn btn--red my-4 interstitial-timed-bristol">BOOK TICKETS</a>
                                            <p class="h5 mb-3 text-black font-weight-bold">Or select a performance using the availability calendar</p>
                                            <p class="h5 mb-3 text-black font-weight-bold"><span class="icon icon-phone"></span> 0844 241 0093*</p>
                                            <p class="text-sm">*Calls cost 7p per min, plus your phone company’s access charge</p>
                                            <p class="mb-0">Book tickets in person</p>
                                            <a href="https://www.google.co.uk/maps/place/Bristol+Hippodrome/@51.4532002,-2.600293,17z/data=!3m1!4b1!4m5!3m4!1s0x48718dd7a144aabf:0xeb2cc12c28695eca!8m2!3d51.4531969!4d-2.5981043" target="_blank" rel="noreferrer noopener">
                                                <p class="h5 mb-3 text-black font-weight-bold"><span class="icon icon-map-marker"></span> Bristol Hippodrome</p>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="text-center container">
                            <div class="">
                                <div class="row">
                                    <div class="pb-0 col">
                                        <div>
                                            <div class="d-md-none py-5">
                                                <Calendar />
                                            </div>

                                            <p class="text-sm m-0 d-none d-md-block">Running: 2hrs 30 mins including interval.</p>
                                            <p class="text-sm m-0 d-none d-md-block">Recommended for all ages 6+, minimum age 3.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="text-center container">
                            <div class="row">
                                <div class="pb-0 col">
                                    <div class="pt-5 d-md-none">
                                        <p class="text-sm m-0 d-md-none">Running: 2hrs 30 mins including interval.</p>
                                        <p class="text-sm m-0 d-md-none">Recommended for all ages 6+, minimum age 3.</p>
                                    </div>
                                    <p><a href="/">Click here</a> to book tickets for London or other UK cities.</p>
                                </div>
                            </div>
                        </div>
                    </Col>

                    <Col lg={6} className="py-5 pt-lg-0 pb-xl-5 d-none d-md-block">
                        <Calendar />

                        <Row className="legend">
                            <Col md={4} className="d-none d-md-block">
                               <span className="square square--available"></span> Good seats available
                            </Col>
                            <Col md={4} className="d-none d-md-block">
                              <span className="square square--goodseats"></span> Some good seats available
                            </Col>
                            <Col md={4} className="d-none d-md-block">
                            <span className="square square--limited"></span> Limited seats available
                            </Col>
                        </Row>
                    </Col>
                    <Col className="py-5 pb-xl-5">
                        <ContentBlocks data={data} />
                    </Col>
                </Row>
            </Layout>
        )
    }
}

export default HomeTemplate 