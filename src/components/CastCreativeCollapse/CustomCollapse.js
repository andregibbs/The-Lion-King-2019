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

    clickHandler(e, id, type) {

        e.preventDefault();

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
            

            const collapseItem = document.getElementById(`collapse${id}${type}`)
            const navHeight = document.querySelector('.m-nav').offsetHeight;

            // Wait for previous to close, the scroll to
            setTimeout(() => {
                window.scrollTo({
                    top: collapseItem.offsetTop - navHeight,
                    behavior: "smooth"
                })
            }, 500);

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
                type={this.props.type}
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
                <a
                    href="#"
                    className="c-collapse__item-trigger no-interstitial-check"
                    onClick={(e) => this.props.clickHandler(e, this.props.id, this.props.type)}>
                    <Img fluid={this.props.data.image.childImageSharp.fluid} alt={this.props.data.title} className="c-collapse__item-trigger-img" />
                    <div className="c-collapse__item-trigger-title">
                        <span>{this.props.data.name}</span>
                        <span className="role">{this.props.data.role}</span>
                    </div>
                </a>
                <div
                    className="c-collapse__item-content"
                    style={{ height: this.props.contentHeight + "px" }}
                    id={`collapse${this.props.id}${this.props.type}`}
                >
                    <div className="c-collapse__item-content-inner">
                        <div className="c-collapse__item-content-inner-bg" dangerouslySetInnerHTML={{ __html: this.props.data.bio }} />
                        <button className="c-collapse__item-content-close" onClick={(e) => this.props.clickHandler(e, this.props.id, this.props.type)}>
                            <span className="sr-only">Close</span>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
