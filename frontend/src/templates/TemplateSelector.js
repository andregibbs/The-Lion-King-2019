import React, { Component } from "react"
import { graphql } from 'gatsby';
import HomeTemplate from './HomeTemplate';
import CastCreativeTemplate from './CastCreativeTemplate';
import AboutTemplate from './AboutTemplate';
import HouseSeatsTemplate from './HouseSeatsTemplate';
import RegisterTemplate from './RegisterTemplate';
import CardiffCalenderTemplate from './CardiffTemplateWithCalendar';
import EdinburghCalenderTemplate from './EdinburghTemplateWithCalendar';
import HomeCalenderTemplate from './HomeTemplateWithCalendar';
import EducationWorkshopTemplate from './EducationWorkshopTemplate';
import DefaultTemplate from "./DefaultTemplate";

class TemplateSelector extends Component {
    render() {

        const data = this.props.data.pagesJson;

        const template = data.template;

        switch (template) {
            case "home-template":
                return <HomeTemplate data={data} />
            case "cardiffcalendar-template":
                return <CardiffCalenderTemplate data={data} />
            case "edinburghcalendar-template":
                return <EdinburghCalenderTemplate data={data} />
            case "homecalendar-template":
                return <HomeCalenderTemplate data={data} />
            case "about-template":
                return <AboutTemplate data={data} />
            case "cast-template":
                return <CastCreativeTemplate data={data} />
            case "houseseats-template":
                return <HouseSeatsTemplate data={data} />
            case "register-template":
                return <RegisterTemplate data={data} />
            case "educationworkshop-template":
                return <EducationWorkshopTemplate data={data} />
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
        inNav
        navPaddingBottom
        bookingInfo
        template
        title
        metaTitle
        metaDescription
        path
        displayBookNow
        displayNav
        headerImage {
            childImageSharp  {
                fluid(maxWidth: 1600, quality: 95) {
                    ...GatsbyImageSharpFluid
                }
            }
        }
        headerImageMobile {
            childImageSharp  {
                fluid(maxWidth: 576, quality: 95) {
                    ...GatsbyImageSharpFluid
                }
            }
        }
        
        auditionFields {
            type
            tour
            content
        }

        contentBlocks {
            type

            bgImageTextBlock {
                imgDesktop {
                    childImageSharp  {
                        fluid(maxWidth: 1600) {
                            ...GatsbyImageSharpFluid
                        }
                    }
                }
                imgMobile {
                    childImageSharp  {
                        fluid(maxWidth: 768) {
                            ...GatsbyImageSharpFluid
                        }
                    }
                }
                withGradient
                text
                links
            }

            twoColumnBlock {
                bgColour
                containerBgColour
                paddingTop
                topContent {
                    content
                }
                column1 {
                    content
                }
                column2 {
                    content
                }
            }

            thinTwoColumnBlock {
                column1 {
                    content
                }
                column2 {
                    content
                }
            }

            textBlockFullWidth {
                textCenter
                fluidContainer
                content
                paddingClass
            }

            faqBlock {
                title
                colour
                items {
                    question
                    answer
                }
            }

            infoBlock {
                items {
                    title
                    image 
                    content
                }
            }
        }
    }
}
`