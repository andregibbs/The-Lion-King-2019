import React, { Component } from 'react'
import { Container } from 'reactstrap'
import Img from 'gatsby-image'
import cast from 'data/cast'

class CastCollapse extends Component {

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

        const items = cast[this.props.parentId]

        const collapseItems = items.map((item, i) => {

            return <CastCollapseItem
                key={i}
                id={i}
                name={item.name}
                role={item.role}
                bio={item.bio}
                clickHandler={this.clickHandler}
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

export default CastCollapse

class CastCollapseItem extends Component {
    render() {
        
        const { 
            name, 
            role, 
            bio, 
            id, 
            clickHandler, 
            contentHeight, 
            activeClass
        } = this.props

        return (
            <div
                className={`c-collapse__item ${activeClass}`}
                style={{ marginBottom: contentHeight + "px" }}>
                <div
                    className="c-collapse__item-trigger"
                    onClick={(e) => clickHandler(e, id)}>
                    {/* <Img fluid={this.props.data.image.childImageSharp.fluid} alt={this.props.data.title} className="c-collapse__item-trigger-img" /> */}
                    <div className="c-collapse__item-trigger-title">
                        <span>{name}</span>
                        <span className="role">{role}</span>
                    </div>
                </div>
                <div
                    className="c-collapse__item-content"
                    style={{ height: contentHeight + "px" }}>
                    <div className="c-collapse__item-content-inner">
                        <div dangerouslySetInnerHTML={{ __html: bio }} />
                    </div>
                </div>
            </div>
        );
    }
}