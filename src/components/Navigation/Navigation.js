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

        const { siteId } = this.props

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
                            <NavLinks siteId={siteId} />
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