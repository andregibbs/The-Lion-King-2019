import React, { Component } from "react"
import { Container, Row, Col, Collapse } from "reactstrap"

class FaqBlock extends Component {

    render() {

        const faqBlocks = this.props.data.map( (block, i) => {

            const faqCountHalf = Math.round(block.items.length / 2)
            const faqs1 = block.items.slice(0, faqCountHalf)
            const faqs2 = block.items.slice(faqCountHalf, block.items.length)

            let { colour } = block
            if (colour === undefined) colour = ""

            return(
                <div key={i}>
                    <Container fluid className={`faq-block ${colour !== undefined ? `faq-block--${colour}` : ''}`}>
                    {block.title !== null &&
                        <Container fluid className="text-center py-4">
                            <h4 className="mb-0 font-weight-semi-bold">{block.title}</h4>
                        </Container>
                    }
                        <Row>
                            <Container fluid className="container-max">
                                <Row>
                                    <Col lg={6}>
                                        {faqs1.map((faq, i) => (
                                            <FaqItem faq={faq} key={i} pageTitle={this.props.pageTitle}/>
                                        ))}
                                    </Col>

                                    <Col lg={6}>
                                        {faqs2.map((faq, i) => (
                                            <FaqItem faq={faq} key={i} />
                                        ))}
                                    </Col>
                                </Row>
                            </Container>
                        </Row>
                    </Container>
                </div>
            )

        })

        return faqBlocks
    }
}

export default FaqBlock

class FaqItem extends Component {

    constructor(props) {
        super(props)

        this.toggle = this.toggle.bind(this);
        this.state = { collapse: false };
    }

    toggle(e) {
        // Track faq dropdown
        if (window.utag !== undefined && !this.state.collapse) {
            var trackingData = {
                siteName: "thelionking",
                country: "uk",
                region: "emea",
                page_name: this.props.pageTitle,
                actionName: "expanded tab",
                actionValue1: e.target.innerText
            };
            window.utag.link(trackingData)
        }
        this.setState({ collapse: !this.state.collapse });
    }

    render() {

        const { question, answer } = this.props.faq

        return (
            <div className="faq-item">
                <button 
                    onClick={(e) => this.toggle(e)} 
                    className={`faq-item__btn  ${this.state.collapse ? 'active' : ''}`}>
                    {question}
                </button>
                <Collapse isOpen={this.state.collapse}>
                    <div
                        className="faq-item__content"
                        dangerouslySetInnerHTML={{ __html: answer }} />
                </Collapse>
            </div>
        )
    }
}