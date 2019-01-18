import React, { Component } from 'react'
import {
    Collapse,
    Navbar,
    Nav
} from 'reactstrap';
import CityLinks from './CityLinks';
import NavLinks from './NavLinks';

class Navigation extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isNavOpen: false,
            isCitiesOpen: false
        }

        this.toggleNav = this.toggleNav.bind(this)
    }

    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        })
    }
    
    render() {

        const { siteId } = this.props

        return (
            <div className="m-nav-outer">
                <Navbar expand="md" className="m-nav">
                    <button type="button" className="navbar-toggler" onClick={this.toggleNav} aria-haspopup="true" aria-expanded="false">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span className="sr-only">Toggle Navigation</span>
                    </button>
                    <Collapse isOpen={this.state.isNavOpen} navbar>
                        <Nav navbar>
                            <NavLinks siteId={siteId} />
                            <CityLinks />
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        )
    }
}

export default Navigation