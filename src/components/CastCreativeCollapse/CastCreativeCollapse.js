import React, { Component } from 'react'
import { graphql, StaticQuery } from 'gatsby'
import classnames from 'classnames';
import { 
    Container,
    TabContent, 
    TabPane, 
    Nav, 
    NavItem
} from 'reactstrap';
import CustomCollapse from './CustomCollapse'
import CustomList from './CustomList'

class CastCollapse extends Component {

    constructor(props) {
        super(props)
        this.state = {
            activeTab: '1',
            pageTitle: ''
        }
        this.toggle = this.toggle.bind(this);
    }

    toggle(tab, e) {
        // Tealium track button click
        if (window.utag !== undefined) {
            var trackingData = {
                siteName: "thelionking",
                country: "uk",
                region: "emea",
                page_name: this.state.pageTitle,
                actionName: "clicked tab",
                actionValue1: e.target.innerText
            };
            window.utag.link(trackingData)
        }
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    componentDidMount() {
        this.setState({
            pageTitle: this.props.data.title
        })
    }

    render() {

        return (
            <Container fluid className="pb-5">
                <Nav tabs className="c-collapse-nav">
                    <NavItem>
                        <button
                            className={classnames({ active: this.state.activeTab === '1' })}
                            onClick={(e) => { this.toggle('1', e); }}
                        >
                            Cast
                        </button>
                    </NavItem>
                    <NavItem>
                        <button
                            className={classnames({ active: this.state.activeTab === '2' })}
                            onClick={(e) => { this.toggle('2', e); }}
                        >
                        Creative
                        </button>
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
                            ensemble {
                                name
                            }
                            swings {
                                name
                            }
                            standbys {
                                name
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
                                    
                                    <CustomList data={node.ensemble} type="cast" />
                                    <CustomList data={node.swings} type="cast" />
                                    <CustomList data={node.standbys} type="cast" />
                                </TabPane>
                            )

                        } else {
                            return (
                                <TabPane tabId="1" key={`cast${i}`}>
                        
                                </TabPane>
                            )
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