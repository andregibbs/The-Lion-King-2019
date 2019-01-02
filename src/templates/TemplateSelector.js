import React, { Component } from "react"

import HomeTemplate from './HomeTemplate';

class TemplateSelector extends Component {
    render() {
        const data = this.props.data.pagesJson;
        const template = data.template;

        switch (template) {
            case "home-template":
                return <HomeTemplate data={data} />
            default:
                return <></>
        }

    }
}

export default TemplateSelector

export const query = graphql`
query($path: String!) {
    pagesJson( path: { eq: $path }) {
        id
        title
        path
        template
    }
}
`