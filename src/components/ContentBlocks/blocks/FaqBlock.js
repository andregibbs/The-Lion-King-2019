import React, { Component } from "react"
import { Container, Row, Col, Collapse, Button } from "reactstrap"

class FaqBlock extends Component {

    render() {

        const { faqs } = this.props.data.faqBlock
        const faqCountHalf = faqs.length / 2
        const faqs1 = faqs.slice(0, faqCountHalf)
        const faqs2 = faqs.slice(faqCountHalf, faqs.length)

        return (
            <Container fluid className="faq-block">
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
        )

    }
}

export default FaqBlock

class FaqItem extends Component {

    constructor(props) {
        super(props)

        this.toggle = this.toggle.bind(this);
        this.state = { collapse: false };
    }

    toggle() {
        this.setState({ collapse: !this.state.collapse });
    }

    render() {

        const { question, answer } = this.props.faq

        return (
            <div className="faq-item">
                <button onClick={this.toggle} className={`faq-item__btn  ${this.state.collapse ? 'active' : ''}`}>{question}</button>
                <Collapse isOpen={this.state.collapse}>
                    <div
                        className="faq-item__content"
                        dangerouslySetInnerHTML={{ __html: answer }} />
                </Collapse>
            </div>
        )
    }
}