import React, { Component } from 'react'
import { graphql, Link, StaticQuery } from 'gatsby'
import {
    Collapse,
    Navbar,
    Nav,
    NavItem,
} from 'reactstrap';

class Navigation extends Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this)
        this.state = {
            isOpen: false
        }
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }
    
    render() {

        const { parentId } = this.props

        return (
            <div className="m-nav-outer">
                <Navbar color="light" light expand="md" className="m-nav">
                    <button type="button" className="navbar-toggler" onClick={this.toggle}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav navbar>
                            <NavLinks parentId={parentId} />
                            <NavItem>
                                <Link to="/" activeClassName="active">Select City</Link>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        )
    }
}

export default Navigation


const NavLinks = (props) => (
    // Query all sites
    <StaticQuery
        query={graphql`
            query {
                allSitesJson {
                    edges {
                        node {
                            id
                            pages {
                                path
                                title
                            }
                        }
                    }
                }
            }
		`}
        render={data => (
            <>
                {
                    // loop all sites
                    data.allSitesJson.edges.map(site => {
                        
                        // if site is equal to current page parentId
                        if (site.node.id === props.parentId) {

                            const pages = site.node.pages

                            // loop pages and create link
                            const links = pages.map( (page, i) => {
                                return (
                                    <NavItem key={i}>
                                        <Link to={page.path} activeClassName="active">{page.title}</Link>
                                    </NavItem>
                                )
                            })

                            return links

                        } else {
                            return
                        }
                        
                    })
                }
            </>
        )}
    />

)