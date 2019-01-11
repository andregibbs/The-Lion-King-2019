import React, { Component } from "react"
import { Container, Row, Col } from "reactstrap"

class InfoBlock extends Component {

    render() {

        const infoBlocks = this.props.data.map((block, i) => {

            console.log(block)

            const infoCountHalf = Math.round(block.items.length / 2)
            const info1 = block.items.slice(0, infoCountHalf)
            const info2 = block.items.slice(infoCountHalf, block.items.length)

            return (
                <div key={i}>
                    <Container fluid className="info-block">
                        <Row>
                            <Container fluid className="container-max">
                                <Row>
                                    <Col md={6}>
                                        {info1.map((info, i) => (
                                            <InfoItem info={info} key={i} />
                                        ))}
                                    </Col>

                                    <Col md={6}>
                                        {info2.map((info, i) => (
                                            <InfoItem info={info} key={i} />
                                        ))}
                                    </Col>
                                </Row>
                            </Container>
                        </Row>
                    </Container>
                </div>
            )

        })

        return infoBlocks
    }
}

export default InfoBlock

class InfoItem extends Component {

    constructor(props) {
        super(props)
    }

    render() {

        const { title, image, content } = this.props.info

        return (
            <div className="info-block__item">
                <div class="info-block__item-image">
                    <img src={image} alt="" />
                </div>
                <h3 className="h4">{ title }</h3>
                <div dangerouslySetInnerHTML={{ __html: content }} />
            </div>
        )
    }
}