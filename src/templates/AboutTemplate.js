import React, { Component } from "react"
import { StaticQuery, graphql } from "gatsby"
import Layout from 'components/Layout/Layout'
import ImageGallery from "components/ImageGallery/ImageGallery";
import BookingInfo from "../components/BookingInfo/BookingInfo";
import ContentBlocks from 'components/ContentBlocks/ContentBlocks'

class AboutTemplate extends Component {
    render() {
        const data = this.props.data
        const { siteId } = this.props.data
        return (
            <Layout data={data}>
                <ContentBlocks data={data} />
                <Images siteId={siteId} />
                <BookingInfo siteId={siteId} />
            </Layout>
        )
    }
}

export default AboutTemplate 


const Images = (props) => (
    // Query all sites
    <StaticQuery
        query={graphql`
            query {
                allGalleriesJson {
                    edges {
                        node {
                            siteId
                            images {
                                thumbnail {
                                    childImageSharp {
                                        fluid(maxWidth: 1200, quality: 100) {
                                            ...GatsbyImageSharpFluid
                                        }
                                    }
                                }
                                src {
                                    childImageSharp {
                                        fluid(maxWidth: 1200, quality: 100) {
                                            ...GatsbyImageSharpFluid
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
		`}
        render={data => (
            <>

                {
                    // loop all galleries
                    data.allGalleriesJson.edges.map((node, i) => {

                        const images = node.node.images
                        
                        // if site is equal to current page siteId
                        // if (node.node.siteId === props.siteId) {

                            return(
                                <ImageGallery
                                    key={i}
                                    data={images}
                                />
                            )
                            
                        // } else {
                        //     return
                        // }

                    })
                }
            </>
        )}
    />
)