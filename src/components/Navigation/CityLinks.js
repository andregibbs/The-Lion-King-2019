import React from 'react'
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
                                        className="dropdown-item" 
                                        key={i}
                                    >{node.title}</Link>
                                )

                            })
                        }
                    </DropdownMenu>
                </UncontrolledDropdown>
            </>
        )}
    />
)

export default CityLinks