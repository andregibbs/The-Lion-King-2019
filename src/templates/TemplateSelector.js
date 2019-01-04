import React, { Component } from "react"

import HomeTemplate from './HomeTemplate';
import CastTemplate from './CastTemplate';

class TemplateSelector extends Component {
    render() {
        const data = this.props.data.pages;
        const template = data.template;

        switch (template) {
            case "home-template":
                return <HomeTemplate data={data} />
            case "cast-template":
                return <CastTemplate data={data} />
            default:
                return <></>
        }

    }
}

export default TemplateSelector

export const query = graphql`
query($path: String!) {
    pages ( path: { eq: $path }) {
        id
        parentId
        title
        path
        template
        headerImage {
            childImageSharp {
                fluid {
                    base64
                    tracedSVG
                    aspectRatio
                    src
                    srcSet
                    srcWebp
                    srcSetWebp
                    sizes
                    originalImg
                    originalName
                }
            }
        }
        headerImageMobile {
            childImageSharp {
                fluid {
                    base64
                    tracedSVG
                    aspectRatio
                    src
                    srcSet
                    srcWebp
                    srcSetWebp
                    sizes
                    originalImg
                    originalName
                }
            }
        }
    }
}
`