import React from 'react'
import { StaticQuery, Link, graphql } from 'gatsby'

const SitemapList = (props) => (
    <StaticQuery
        query={graphql`
            query PagesQuery {
                allPagesJson {
                    edges {
                        node {
                            siteId
                            path
                            title
                        }
                    }
                }
            }
        `}
        render={data => (
            <List data={data} id={props.id} />
        )}
    />
)

export default SitemapList

const List = (props) => {

    const pages = props.data.allPagesJson.edges

    const list = pages.map((item, i) => {
        if (item.node.siteId === props.id) {
            return (
                <li key={i}>
                    <Link to={item.node.path}>{item.node.title}</Link>
                </li>
            )
        } else {
            return ""
        }
    })

    return (
        <ul>
            {list}
        </ul>
    )
}
