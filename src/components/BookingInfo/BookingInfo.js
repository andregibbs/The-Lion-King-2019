import React, { Component } from 'react'
import { graphql, StaticQuery } from 'gatsby'
import { Container, Row, Col } from 'reactstrap'

class BookingInfo extends Component {
    render() {
        return (
            <BookingInfoBlocks siteId={this.props.siteId} />
        )
    }
}

export default BookingInfo


const BookingInfoBlocks = (props) => (
    // Query all sites
    <StaticQuery
        query={graphql`
            query {
                allBookingInfoJson {
                    edges {
                        node {
                            siteId
                            introText {
                                title
                                content
                            }
                            online {
                                title
                                links {
                                    url
                                    title
                                    ignoreInterstitial
                                }
                            }
                            byPhone {
                                title
                                content
                            }
                            inPerson {
                                title
                                content
                            }
                        }
                    }
                }
            }
		`}
        render={data => (
            <>

                {
                    // loop all sites
                    data.allBookingInfoJson.edges.map(({ node }, i) => {

                        // if cast siteId is equal to current page siteId
                        if (node.siteId === props.siteId) {

                            // loop sites and create link
                            return (
                                <Container key={i} className="booking-info" id="book-now">
                                    <Row>
                                        <IntroText data={node.introText} />
                                        <BookOnline data={node.online} />
                                        <ByPhone data={node.byPhone} />
                                        <InPerson data={node.inPerson} />
                                    </Row>
                                </Container>
                            )

                        } else {
                            return ""
                        }

                    })
                }
            </>
        )}
    />
)


const IntroText = (props) => {
    
    return(
        <Col className="text-center pt-4 pb-4" xs={12}>
            <h2 className="h5 pb-3 text-red font-weight-bold">{ props.data.title }</h2>
            <div dangerouslySetInnerHTML={{ __html: props.data.content }} />
        </Col>
    )
}

const BookOnline = (props) => {
    
    return(
        <Col md={4} className="booking-info__block">
            <p className="text-red font-weight-bold">{props.data.title}</p>
            {
                props.data.links.map((link, i) => {
                    return (
                        <a
                            href={link.url}
                            key={i}
                            className={`btn btn--red btn--block btn--large-2 mb-2 ${link.ignoreInterstitial ? 'no-interstitial-check' : 'interstitial-timed'}`}
                            dangerouslySetInnerHTML={{ __html: link.title }}
                        />
                    )
                })
            }
        </Col>
    )
}

const ByPhone = (props) => {
    return(

        <Col md={4} className="booking-info__block">
            <p className="text-red font-weight-bold">{props.data.title}</p>
            <div className="booking-info__content p-4">
                <div dangerouslySetInnerHTML={{ __html: props.data.content }} />
            </div>
        </Col>
    )
}

const InPerson = (props) => {
    return(
        <Col md={4} className="booking-info__block">
            <p className="text-red font-weight-bold">{props.data.title}</p>
            <div className="booking-info__content p-4">
                <div dangerouslySetInnerHTML={{ __html: props.data.content }} />
            </div>
        </Col>
    )
}