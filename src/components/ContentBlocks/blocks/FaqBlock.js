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
                    {block.title !== null &&
                        <Container fluid className="text-center pb-4 pb-md-5">
                            <h4 className="mb-0 font-weight-semi-bold">{block.title}</h4>
                        </Container>
                    }
                    <Container fluid className={`faq-block ${colour !== undefined ? `faq-block--${colour}` : ''}`}>
                        <Row>
                            <Container fluid className="container-max">
                                <Row>
                                    <Col md={6}>
                                        {faqs1.map((faq, i) => (
                                            <FaqItem faq={faq} key={i} />
                                        ))}
                                    </Col>

                                    <Col md={6}>
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
        if (window.utag !== undefined) {
            window.utag.link({
                "actionName": e.target.innerText
            })
        }
        this.setState({ collapse: !this.state.collapse });
    }

    render() {

        const { question, answer } = this.props.faq

        return (
            <div className="faq-item">
                <button onClick={(e) => this.toggle(e)} className={`faq-item__btn  ${this.state.collapse ? 'active' : ''}`}>{question}</button>
                <Collapse isOpen={this.state.collapse}>
                    <div
                        className="faq-item__content"
                        dangerouslySetInnerHTML={{ __html: answer }} />
                </Collapse>
            </div>
        )
    }
}