import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { Container } from 'reactstrap'
import SitemapList from './SitemapList'
import Layout from 'components/Layout/Layout'

const Sitemap = () => (
    <StaticQuery
        query={graphql`
            query SiteQuery {
                allSitesJson {
                    edges {
                        node {
                            id
                            path
                            title
                        }
                    }
                }
            }
        `}
        render={data => (
            <SitemapSites data={data} />
        )}
    />
)



const SitemapSites = (props) => {

    const sites = props.data.allSitesJson.edges

    const list = sites.map((item, i) => {
        return (
            <li key={i}>
                {item.node.title}
                <SitemapList id={item.node.id} />
            </li>
        )
    })

    return (
        <Layout displayHeader={false}>
            <Container>
                <h1>Sitemap</h1>
                <ul>
                    {list}
                </ul>
            </Container>
        </Layout>
    )
}


export default Sitemap