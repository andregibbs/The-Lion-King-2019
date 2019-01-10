import React, { Component } from "react"
import { graphql } from 'gatsby';
import HomeTemplate from './HomeTemplate';
import CastCreativeTemplate from './CastCreativeTemplate';
import AboutTemplate from './AboutTemplate';
import DefaultTemplate from "./DefaultTemplate";

class TemplateSelector extends Component {
    render() {

        const data = this.props.data.pagesJson;

        const template = data.template;

        switch (template) {
            case "home-template":
                return <HomeTemplate data={data} />
            case "about-template":
                return <AboutTemplate data={data} />
            case "cast-template":
                return <CastCreativeTemplate data={data} />
            case "default-template": 
                return <DefaultTemplate data={data} />
            default:
                return
        }

    }
}

export default TemplateSelector

export const query = graphql`
query($id: String!) {
    pagesJson ( id: { eq: $id }) {
        id
        siteId
        template
        title
        path
        headerImage {
            childImageSharp  {
                fluid(maxWidth: 1600) {
                    ...GatsbyImageSharpFluid
                }
            }
        }
        headerImageMobile {
            childImageSharp  {
                fluid(maxWidth: 768) {
                    ...GatsbyImageSharpFluid
                }
            }
        }
        contentBlocks {
            textBlockFullWidth {
                content
            }
            bookTicketsBlock {
                column1
            }
            faqBlock {
                title
                items {
                    question
                    answer
                }
            }
        }
    }
}
`