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
                            }
                            inPerson {
                                title
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
                                <Container key={i} className="booking-info">
                                    <Row>
                                        <BookOnline data={node.online} />
                                        <ByPhone data={node.byPhone} />
                                        <InPerson data={node.inPerson} />
                                    </Row>
                                </Container>
                            )

                        } else {
                            return
                        }

                    })
                }
            </>
        )}
    />
)


const BookOnline = (props) => {
    
    console.log(props)

    return(
        <Col md={4}>
            <p className="text-red">
                <strong>{props.data.title}</strong>
            </p>
            {
                props.data.links.map((link, i) => {
                    return (
                        <a
                            href={link.url}
                            key={i}
                            className={`btn btn--red btn--block btn--large-2 mb-2 ${link.ignoreInterstitial ? 'no-interstitial-check' : ''}`}
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
        <Col md={4}>
            <p className="text-red">
                <strong>{props.data.title}</strong>
            </p>
            <div className="booking-info__content">
                <p>Call the Prince Edward Box Office</p>
                <p><span className="icon icon-phone"></span>0844 482 5151</p>
                <p>Calls cost 7p per min, plus your phone<br />company’s access charge</p>
			</div>
        </Col>
    )
}

const InPerson = (props) => {
    return(
        <Col md={4}>
            <p className="text-red">
                <strong>{props.data.title}</strong> 
            </p>
            <div className="booking-info__content">
                <p>Call the Prince Edward Box Office</p>
                <p><span className="icon icon-phone"></span>0844 482 5151</p>
                <p>Calls cost 7p per min, plus your phone<br />company’s access charge</p>
            </div>
        </Col>
    )
}