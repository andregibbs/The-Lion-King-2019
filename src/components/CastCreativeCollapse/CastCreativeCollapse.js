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
// import CustomList from './CustomList'

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
                            youngsimba {
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
                            youngnala {
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
                    data.allCastJson.edges.map(({node}, i) => {

                        // if cast siteId is equal to current page siteId
                        if (node.siteId === props.siteId) {

                            return (
                                <TabPane tabId="1" key={`cast${i}`}> 
                                    <CustomCollapse data={node.items} type="cast" />
                                    {node.youngsimba !== null &&   
                                        <>
                                            <h2 className="py-3 text-center">Young Simba</h2>
                                            <CustomCollapse data={node.youngsimba} type="youngsimba" /> 
                                        </>
                                    }

                                    {node.youngnala !== null &&  
                                        <>
                                            <h2 className="py-3 text-center">Young Nala</h2> 
                                            <CustomCollapse data={node.youngnala} type="youngnala" /> 
                                        </>
                                    }     

                                    {node.ensemble !== null &&   
                                        <>
                                            <h2 className="py-3 text-center">Ensemble</h2>
                                            <CustomCollapse data={node.ensemble} type="ensemble" /> 
                                            
                                        </>
                                    }
                                </TabPane>
                            )

                        } else {
                            return (
                                <TabPane tabId="1" key={`cast${i}`}>
                                 {/*<h2 className="text-center p-5">Cast coming soon!</h2>*/}

                                </TabPane>
                            )
                        }

                    })
                }

                {
                    // loop all creatives
                    data.allCreativesJson.edges.map(({node}, i) => {

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