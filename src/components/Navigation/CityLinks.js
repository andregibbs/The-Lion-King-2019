import React, { Component } from 'react'
import { graphql, Link, StaticQuery } from 'gatsby'
import {
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu
} from 'reactstrap';

const CityLinks = (props) => (
    // Query all sites
    <StaticQuery
        query={graphql`
            query {
                allSitesJson {
                    edges {
                        node {
                            id
                            path
                            title
                        }
                    }
                }
            }
		`}
        render={data => (
            <>
                <CityDropdown data={data} pageTitle={props.pageTitle}/>
            </>
        )}
    />
)

export default CityLinks

class CityDropdown extends Component {

    constructor(props) {
        super(props)
        this.state = {
            siteId: ""
        }
    }

    componentDidMount() {
        const siteId = window.location.pathname.split('/')[1];
        this.setState({
            siteId
        })
    }

    trackLink(e) {
        // Tealium track button click
        if (window.utag !== undefined) {
            var trackingData = {
                siteName: "thelionking",
                country: "uk",
                region: "emea",
                page_name: this.props.pageTitle,
                actionName: "expanded tab",
                actionValue1: e.target.innerText
            };
            window.utag.link(trackingData)
        }
    }

    render() {
        const data = this.props.data

        return(
            <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav className="no-interstitial-check">
                    Select City
                </DropdownToggle>
                <DropdownMenu>
                    {
                        // loop all sites
                        data.allSitesJson.edges.map(({ node }, i) => {

                            // loop sites and create link
                                return (
                                    <Link
                                        to={node.path}
                                        activeClassName="active"
                                        className={`dropdown-item ${node.id === this.state.siteId ? 'disabled' : ""}`}
                                        key={i}
                                        onClick={(e) => this.trackLink(e)}
                                    >{node.title}</Link>
                                )
    
                        })
                    }
                </DropdownMenu>
            </UncontrolledDropdown>
        )
    }
}