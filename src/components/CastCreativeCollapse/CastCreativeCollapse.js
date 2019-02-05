import React, { Component } from 'react'
import { graphql, StaticQuery } from 'gatsby'
import classnames from 'classnames';
import { 
    Container,
    TabContent, 
    TabPane, 
    Nav, 
    NavItem, 
    NavLink 
} from 'reactstrap';
import CustomCollapse from './CustomCollapse'

class CastCollapse extends Component {

    constructor(props) {
        super(props)
        this.state = {
            activeTab: '1'
        }
        this.toggle = this.toggle.bind(this);
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    render() {

        return (
            <Container fluid className="pb-5">
                <Nav tabs className="c-collapse-nav">
                    <NavItem>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === '1' })}
                            onClick={() => { this.toggle('1'); }}
                        >
                                Cast
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === '2' })}
                            onClick={() => { this.toggle('2'); }}
                        >
                                Creative
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                    <CastItems 
                        siteId={this.props.siteId}
                        clickHandler={this.clickHandler}
                        activeId={this.state.activeId}
                        contentHeight={this.state.contentHeight}
                    />
                </TabContent>
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
                            items {
                                name
                                role
                                bio
                                image {
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
                allCreativesJson {
                    edges {
                        node {
                            siteId
                            items {
                                name
                                role
                                bio
                                image {
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
		`}
        render={data => (
            <>
                {
                    // loop all cast
                    data.allCastJson.edges.map(({node, i}) => {

                        // if cast siteId is equal to current page siteId
                        if (node.siteId === props.siteId) {

                            return (
                                <TabPane tabId="1" key={`cast${i}`}> 
                                    <CustomCollapse data={node.items} type="cast" />
                                </TabPane>
                            )

                        } else {
                            return ""
                        }

                    })
                }

                {
                    // loop all creatives
                    data.allCreativesJson.edges.map(({node, i}) => {

                        // if creatives siteId is equal to current page siteId
                        if (node.siteId === props.siteId) {

                            return (
                                <TabPane tabId="2" key={`creatives${i}`}>
                                    <CustomCollapse data={node.items} type="creatives" />
                                </TabPane>
                            )

                        } else {
                            return ""
                        }

                    })
                }

            </>
        )}
    />
)