import React, { Component } from "react"
import FooterFindOutMore from 'components/Footer/FooterFindOutMore'
import FooterSocial from 'components/Footer/FooterSocial'
import FooterLinks from 'components/Footer/FooterLinks'

class Footer extends Component {

    render() {

        return (
            <footer className="footer">
                {this.props.displayFooterFindOutMore &&
                    <FooterFindOutMore siteId={this.props.siteId} />
                }
                <FooterSocial />
                <FooterLinks />
            </footer>
        )
    }
}

export default Footer