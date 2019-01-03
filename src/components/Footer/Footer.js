import React, { Component } from "react"
import FooterFindOutMore from 'components/Footer/FooterFindOutMore'
import FooterSocial from 'components/Footer/FooterSocial'
import FooterLinks from 'components/Footer/FooterLinks'

class Footer extends Component {
    render() {
        return (
            <footer>
                <FooterFindOutMore />
                <FooterSocial />
                <FooterLinks />
            </footer>
        )
    }
}

export default Footer