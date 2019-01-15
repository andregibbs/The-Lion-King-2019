import React from 'react'
import { graphql, Link, StaticQuery } from 'gatsby'
import { NavItem } from 'reactstrap';

const NavLinks = (props) => (
    // Query all pages
    <StaticQuery
        query={graphql`
            query {
                allPagesJson {
                    edges {
                        node {
                            id
                            siteId
                            path
                            title
                        }
                    }
                }
            }
		`}
        render={data => (
            <>
                {
                    // loop all sites
                    data.allPagesJson.edges.map(({ node }, i) => {

                        // if site is equal to current page siteId
                        if (node.siteId === props.siteId) {

                            // loop pages and create link
                            return (
                                <NavItem key={i}>
                                    <Link to={node.path} activeClassName="active">{node.title}</Link>
                                </NavItem>
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

export default NavLinks