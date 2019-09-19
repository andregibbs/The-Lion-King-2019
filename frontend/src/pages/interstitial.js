import React, { Component } from 'react'
import Layout from 'components/Layout/Layout'
import { navigate, Link } from 'gatsby'
import logo from 'images/logo-nosub.svg'
// import lionsHead from 'images/backgrounds/lionhead.png'
import { Container, Row, Col } from 'reactstrap'

class Interstitial extends Component {

    constructor(props) {
        super(props)

        this.state = {
            href: "",
            previousUrl: ""
        }

        this.cancelRedirect = this.cancelRedirect.bind(this)
    }

    componentDidMount() {
        if (this.props.location.state === null || typeof this.props.location.state === undefined) {
            navigate("/");
            return true
        }

        console.log(this.props.location.state)

        const { href, previousUrl, atg, atgBristol, atgEdinburgh, atgWales, atgBradford} = this.props.location.state

        this.setState({
            href,
            previousUrl,
            atg,
            atgBristol,
            atgEdinburgh,
            atgWales,
            atgBradford
        })

        // Set up auto redirect if atg link
        if (atg || atgBristol || atgEdinburgh || atgWales || atgBradford) {
            this.redirect = setTimeout(function() {  window.location.href = href;  }, 4000);
        }

    }

    cancelRedirect() {
        clearTimeout(this.redirect)
    }

    render() {

        const { href, previousUrl, atg, atgBristol, atgEdinburgh, atgWales, atgBradford} = this.state

        let office = 'Lyceum Theatre Box Office operated by ATG Tickets'

        if (atgBristol) {
            office = 'Bristol Hippodrome Box Office operated by ATG Tickets'
        } else if (atgEdinburgh) {
            office = 'Edinburgh Playhouse Box Office operated by ATG Tickets'
        } else if (atgWales) {
            office = 'Wales Millenium Centre Box Office'
        } else if (atgBradford) {
            office = 'The Alhambra Theatre Box Office operated by Bradford Theatres'
        }
        


        if (href !== "" && previousUrl !== "") {

            return(
                <Layout displayHeader={false} displayFooter={false}>
                    <div className="p-3 bg-light-grey">
                        <Container fluid className="landing py-3">
                            {/* <img src={lionsHead} alt="" className="landing__lion" /> */}
                            <Row>
                                <Container>
                                    <Row className="align-items-center landing__wrap">
                                        <Col className="col-md-6 offset-md-6 col-xl-5 offset-xl-7 text-center">
                                            <h1>
                                                <img src={logo} alt="Disney's The Lion King" />
                                            </h1>
                                            <h2 className="pt-3">PLEASE NOTE</h2>

                                            {!atg && !atgBristol && !atgEdinburgh && !atgBradford && !atgWales ? (
                                                <>
                                                    <p>Disney does not control this website so please click below to say you are happy to continue. Disney’s privacy practices and controls do not apply once you leave our site.</p>
                                                    <Row>
                                                        <Col className="col-6">
                                                            <Link to={previousUrl} className="btn btn--red btn--block">Go Back</Link>
                                                        </Col>
                                                        <Col className="col-6">
                                                            <a href={href} target="_blank" rel="noopener noreferrer" className="btn btn--red btn--block">Continue</a>
                                                        </Col>
                                                    </Row>
                                                </>
                                            ) : (
                                                <>
                                                    <p>You are now being redirected to the {office}</p>
                                                    <p>Please note that Disney’s privacy practices and controls do not apply once you leave our site.</p>
                                                    <div className="lds-facebook"><div></div><div></div><div></div></div>
                                                    <Row className="justify-content-center">
                                                        <Col xs={6}>
                                                            <Link to={previousUrl} className="btn btn--red btn--block" onClick={this.cancelRedirect}>Go Back</Link>
                                                        </Col>
                                                    </Row>
                                                </>
                                            )}
                                        </Col>
                                    </Row>
                                </Container>
                            </Row>
                        </Container>
                    </div>
                </Layout>
            )
        } else {
            return <></>
        }

    }

}

export default Interstitial
