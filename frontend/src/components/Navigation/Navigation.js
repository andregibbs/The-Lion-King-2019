import React, { Component } from 'react'
import {
    Collapse,
    Navbar,
    Nav,
    NavItem
} from 'reactstrap';
import { Link } from 'gatsby'
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

        const { siteId, navPaddingBottom, displayBookNow, pageTitle } = this.props.data

        return (
            <div className={`m-nav-outer ${navPaddingBottom !== null && navPaddingBottom === false ? '' : 'pb-3 pb-md-4'}`}>
                <Navbar expand="lg" className="m-nav py-1">
                    <button type="button" className="navbar-toggler" onClick={this.toggleNav} aria-haspopup="true" aria-expanded="false">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span className="sr-only">Toggle Navigation</span>
                    </button>
                    <Collapse isOpen={this.state.isNavOpen} navbar>
                        <Nav navbar>
                            {siteId === 'relaxedperformances' &&
                                <NavItem>
                                    <Link to="/" activeClassName="active">Home</Link>
                                </NavItem>
                            }
                            <NavLinks siteId={siteId} />
                            <CityLinks pageTitle={pageTitle} />
                        </Nav>
                    </Collapse>
                    {displayBookNow !== false &&
                        <BookNowLink />
                    }
                </Navbar>
            </div>
        )
    }
}

export default Navigation

class BookNowLink extends Component {

    scrollTo() {
        const bookNowDiv = document.getElementById("book-now")
        window.scrollTo({
            top: bookNowDiv.offsetTop,
            behavior: "smooth" 
        })
    }

    render () {
        return (
            <button className="btn btn--red m-nav-book" onClick={this.scrollTo}>Book Now</button>
        )
    }

}