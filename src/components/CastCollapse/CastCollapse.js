import React, { Component } from 'react'
import { Container } from 'reactstrap'
import { graphql, StaticQuery } from 'gatsby'
import Img from 'gatsby-image'

class CastCollapse extends Component {

    constructor(props) {
        super(props)
        this.state = {
            activeId: 1,
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

        return (
            <Container fluid className="c-collapse">
                <CastItems 
                    siteId={this.props.siteId}
                    clickHandler={this.clickHandler}
                    activeId={this.state.activeId}
                    contentHeight={this.state.contentHeight}
                />
            </Container>
        )
    }
}

export default CastCollapse

const CastItems = (props) => (
    // Query all sites
    <StaticQuery
        query={graphql`
            query {
                allCastJson {
                    edges {
                        node {
                            siteId
                            cast {
                                name
                                role
                                bio
                                image {
                                    ... on File {
                                        childImageSharp {
                                            fluid(maxWidth: 380) {
                                                ...GatsbyImageSharpFluid
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
		`}
        render={data => (
            <>
                {
                    // loop all cast
                    data.allCastJson.edges.map(({node}) => {

                        // if cast siteId is equal to current page siteId
                        if (node.siteId === props.siteId) {

                            const castList = node.cast

                            // loop cast and create item
                            const castItems = castList.map((c, i) => {
                                return (
                                    <CastCollapseItem
                                        key={i}
                                        id={i}
                                        name={c.name}
                                        role={c.role}
                                        bio={c.bio}
                                        image={c.image}
                                        clickHandler={props.clickHandler}
                                        contentHeight={props.activeId === i ? props.contentHeight : 0}
                                        activeClass={props.activeId === i ? 'active' : ''}
                                    />
                                )
                            })

                            return castItems

                        } else {
                            return
                        }

                    })
                }
            </>
        )}
    />

)

class CastCollapseItem extends Component {
    render() {

        const {
            name,
            role,
            bio,
            id,
            image,
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
                    <Img fluid={image.childImageSharp.fluid} alt={name} className="c-collapse__item-trigger-img" />
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