import React, { Component } from "react"
import { graphql } from 'gatsby';
import HomeTemplate from './HomeTemplate';
import CastTemplate from './CastTemplate';
import AboutTemplate from './AboutTemplate';

class TemplateSelector extends Component {
    render() {

        const data = this.props.data.pages;
        const template = data.template;

        switch (template) {
            case "home-template":
                return <HomeTemplate data={data} />
            case "about-template":
                return <AboutTemplate data={data} />
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
                    aspectRatio
                    src
                    srcSet
                    sizes
                }
            }
        }
        headerImageMobile {
            childImageSharp  {
                fluid {
                    base64
                    aspectRatio
                    src
                    srcSet
                    sizes
                }
            }
        }
    }
}
`