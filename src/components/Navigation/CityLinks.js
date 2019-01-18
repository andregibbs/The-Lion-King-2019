import React, { Component } from 'react'
import { graphql, Link, StaticQuery } from 'gatsby'
import {
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu
} from 'reactstrap';

const CityLinks = () => (
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
                <CityDropdown data={data} />
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
                                    >{node.title}</Link>
                                )
    
                        })
                    }
                </DropdownMenu>
            </UncontrolledDropdown>
        )
    }
}