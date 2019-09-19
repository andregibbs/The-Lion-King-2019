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
            siteId: "",
            isOpen: false
        }

        this.openNav = this.openNav.bind(this)
        this.openNavClick = this.openNavClick.bind(this)
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

    openNav(e) {
        if (e.which === 9) { // tab
            this.setState({ isOpen: true })
        }
    }

    openNavClick() {
        this.setState({ isOpen: !this.state.isOpen })
    }

    render() {
        const data = this.props.data

        return(
            <UncontrolledDropdown nav inNavbar isOpen={this.state.isOpen}>
                <DropdownToggle nav className="no-interstitial-check" onKeyDown={this.openNav} onClick={this.openNavClick}>
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