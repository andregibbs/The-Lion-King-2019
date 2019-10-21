import React, { Component } from "react"
import Layout from 'components/Layout/Layout'
import { Row, Col } from 'reactstrap'
import ContentBlocks from 'components/ContentBlocks/ContentBlocks'
import Calendar from 'components/Calendar/Calendar'

class BradfordCalendarTemplate extends Component {
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
                                            <span class="text-red">Alhambra Theatre</span> <br /><span class="mobile-title">30 April – 20 June 2020</span></h1>
                                        {/* <h5>For best availability please choose performances in August</h5> */}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="text-center container">
                            <div class="">
                                <div class="row">
                                    <div class="pb-0 col">
                                        <div>
                                        <div class="row py-4">
                                        <Col md={6}>
                                            <a href='https://www.bradford-theatres.co.uk/whats-on/the-lion-king' class='btn btn--red btn--block mb-2 interstitial-timed-bradford'>Book tickets with<br /> the Alhambra Theatre</a>
                                        </Col>
                                        <Col md={6}>
                                        <a href='https://tickets.disney.co.uk/tickets/series/lionkingbradford' class='btn btn--red btn--block mb-3 no-interstitial-check'> <span>Book direct with <img src='/images/disney-logo-white.svg' alt='Disney'/></span> </a>
                                        </Col>
                                        </div>
                                            <p class="h5 mb-3 text-black">Or select a performance using the availability calendar</p>
                                            <p class="h5 mb-3 text-black font-weight-bold"><span class="icon icon-phone"></span>  01274 432000*</p>
                                            <p class="mb-0">Book tickets in person</p>
                                            <a href="https://www.google.com/maps/place/Alhambra+Theatre,+Bradford/@53.7918287,-1.7569259,19z/data=!4m5!3m4!1s0x0:0x17e3c9c24d4026e2!8m2!3d53.7917265!4d-1.7568843" target="_blank" rel="noreferrer noopener">
                                                <p class="h5 mb-3 text-black font-weight-bold"><span class="icon icon-map-marker"></span> Alhambra Theatre</p>
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
                                            <Calendar site={data.siteId} />
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
                         <Calendar site={data.siteId} />

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

export default BradfordCalendarTemplate 