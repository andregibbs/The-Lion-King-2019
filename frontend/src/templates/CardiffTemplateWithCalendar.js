import React, { Component } from "react"
import Layout from 'components/Layout/Layout'
import { Row, Col } from 'reactstrap'
import ContentBlocks from 'components/ContentBlocks/ContentBlocks'
import Calendar from 'components/Calendar/Calendar'

class CardiffCalendarTemplate extends Component {
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
                                            <span class="text-red">Wales Millennium Centre</span> <br /><span class="mobile-title">9 July – 29 August 2020</span></h1>
                                        <h5>For best availability please choose performances in August</h5>
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
                                            <a href=' https://www.wmc.org.uk/en/whats-on/2020/the-lion-king/' class='btn btn--red btn--block mb-2 interstitial-timed-wales'>Book tickets with the Wales Millennium Centre</a>
                                        </Col>
                                        <Col md={6}>
                                        <a href='https://tickets.disney.co.uk/tickets/series/lionkingcardiff' class='btn btn--red btn--block mb-3 no-interstitial-check'> <span>Book direct with <img src='/images/disney-logo-white.svg' alt='Disney'/></span> </a>
                                        </Col>
                                        </div>
                                            <p class="h5 mb-3 text-black">Or select a performance using the availability calendar</p>
                                            <p class="h5 mb-3 text-black font-weight-bold"><span class="icon icon-phone"></span> 029 2063 6464</p>
                                            <p class="mb-0">Book tickets in person</p>
                                            <a href="https://www.google.com/maps/place/Wales+Millennium+Centre/@51.4647776,-3.1632752,18.57z/data=!4m5!3m4!1s0x0:0xb21b216518da85c6!8m2!3d51.4648421!4d-3.163183" target="_blank" rel="noreferrer noopener">
                                                <p class="h5 mb-3 text-black font-weight-bold"><span class="icon icon-map-marker"></span> Wales Millennium Centre</p>
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

export default CardiffCalendarTemplate 