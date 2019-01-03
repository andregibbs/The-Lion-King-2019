import React, { Component } from 'react'
import { Link } from 'gatsby'
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
                            <NavItem>
                                <Link to="/" activeClassName="active">Home</Link>
                            </NavItem>
                            <NavItem>
                                <Link to="/about-the-show/" activeClassName="active">About the Show</Link>
                            </NavItem>
                            <NavItem>
                                <Link to="/cast-and-creative/" activeClassName="active">Cast &amp; Creative</Link>
                            </NavItem>
                            <NavItem>
                                <Link to="/your-visit/" activeClassName="active">Your Visit</Link>
                            </NavItem>
                            <NavItem>
                                <Link to="/access/" activeClassName="active">Access</Link>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        )
    }
}

export default Navigation
