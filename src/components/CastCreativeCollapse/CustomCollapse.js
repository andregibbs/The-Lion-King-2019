import React, { Component } from 'react'
import { Container } from 'reactstrap'
import Img from 'gatsby-image'

class CustomCollapse extends Component {

    constructor(props) {
        super(props)
        this.state = {
            activeId: "",
            contentHeight: 0
        }
        this.clickHandler = this.clickHandler.bind(this);
    }

    clickHandler(e, id) {

        if (this.state.activeId === id) {
            this.setState({
                activeId: "",
                contentHeight: 0
            });
        } else {
            const trigger = e.currentTarget;
            // const container = trigger.parentElement;
            const content = trigger.nextSibling;
            const inner = content.children[0];
            const height = inner.offsetHeight;
            this.setState({
                activeId: id,
                contentHeight: height
            });
        }

    }

    render() {

        const items = this.props.data

        const collapseItems = items.map((item, i) => {
            return <CustomCollapseItem
                key={i}
                id={i}
                data={item}
                clickHandler={this.clickHandler}
                activeId={this.state.activeId}
                contentHeight={this.state.activeId === i ? this.state.contentHeight : 0}
                activeClass={this.state.activeId === i ? 'active' : ''}
            />
        });

        return (
            <Container fluid className="c-collapse">
                {collapseItems}
            </Container>
        )
    }
}

export default CustomCollapse

class CustomCollapseItem extends Component {

    render() {
        return (
            <div
                className={`c-collapse__item ${this.props.activeClass}`}
                style={{ marginBottom: this.props.contentHeight + "px" }}>
                <div
                    className="c-collapse__item-trigger"
                    onClick={(e) => this.props.clickHandler(e, this.props.id)}>
                    <Img fluid={this.props.data.image.childImageSharp.fluid} alt={this.props.data.title} className="c-collapse__item-trigger-img" />
                    <div className="c-collapse__item-trigger-title">
                        <span>{this.props.data.name}</span>
                        <span className="role">{this.props.data.role}</span>
                    </div>
                </div>
                <div
                    className="c-collapse__item-content"
                    style={{ height: this.props.contentHeight + "px" }}>
                    <div className="c-collapse__item-content-inner">
                        <div dangerouslySetInnerHTML={{ __html: this.props.data.bio }} />
                    </div>
                </div>
            </div>
        );
    }
}
