import React, { Component } from 'react'
import { graphql, Link, StaticQuery } from 'gatsby'
import {
    Collapse,
    Navbar,
    Nav,
    NavItem,
    UncontrolledDropdown, 
    DropdownItem, 
    DropdownToggle, 
    DropdownMenu
} from 'reactstrap';

class Navigation extends Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this)
        this.state = {
            isNavOpen: false,
            isCitiesOpen: false
        }
    }

    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        })
    }
    
    toggleCities() {
        this.setState({
            isCitiesOpen: !this.state.isCitiesOpen
        })
    }
    
    render() {

        const { siteId } = this.props

        return (
            <div className="m-nav-outer">
                <Navbar color="light" light expand="md" className="m-nav">
                    <button type="button" className="navbar-toggler" onClick={this.toggleNav}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav navbar>
                            <NavLinks siteId={siteId} />
                            <UncontrolledDropdown nav isOpen={this.state.dropdownOpen} toggle={this.toggleCities}>
                                <DropdownToggle nav caret className="no-interstitial-check">
                                    Select City
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem>
                                        <Link to="/" activeClassName="active">London</Link>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <Link to="/" activeClassName="active">Bristol</Link>
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
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
                    data.allPagesJson.edges.map( ({node}, i) => {
                        
                        // if site is equal to current page siteId
                        if (node.siteId === props.siteId) {

                            // loop pages and create link
                            return (
                                <NavItem key={i}>
                                    <Link to={node.path} activeClassName="active">{node.title}</Link>
                                </NavItem>
                            )

                        } else {
                            return
                        }
                        
                    })
                }
            </>
        )}
    />

)