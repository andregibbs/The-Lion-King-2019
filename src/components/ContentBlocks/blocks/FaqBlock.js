import React, { Component } from "react"
import { Container, Row, Col, Collapse, Button } from "reactstrap"

class FaqBlock extends Component {

    render() {

        console.log(this.props.data)

        const faqBlocks = this.props.data.faqBlock.map( (block, i) => {

            const faqCountHalf = block.items.length / 2
            const faqs1 = block.items.slice(0, faqCountHalf)
            const faqs2 = block.items.slice(faqCountHalf, block.items.length)

            return(
                <>
                    {block.title !== null &&
                        <Container fluid className="text-center py-4 py-md-5">
                            <h4 className="mb-0">{block.title}</h4>
                        </Container>
                    }
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
                </>
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