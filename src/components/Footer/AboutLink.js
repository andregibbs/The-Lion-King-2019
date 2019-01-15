import React from "react"
import { Col } from 'reactstrap';
import { Link, StaticQuery, graphql } from 'gatsby'

const AboutLink = (props) => (
    <StaticQuery
        query={graphql`
			query {
                allPagesJson {
                    edges {
			            node {
                            siteId
                            path
                            title
                            inFooter
                        }
                    }
                }
			}
    	`}
        render={data => (
            <LinkToDisplay data={data} siteId={props.siteId} />
        )}
    />
)

export default AboutLink


const LinkToDisplay = (props) => {

    let link

    link = props.data.allPagesJson.edges.map( ({node}, i) => {

        if (node.siteId === props.siteId && node.inFooter !== null) {
            return (
                <div key={i}>
                    <Col md={6}>
                        <Link to={node.path} className="btn btn--red btn--block btn--large">
                            <span>Find out more</span>
                        </Link>
                    </Col>
                    <Col md={6} className="mt-2 mt-md-0">
                        <Link to={node.path} className="btn btn--red btn--block btn--large">
                            <span>Watch trailer</span>
                        </Link>
                    </Col>
                </div>
            )
        } else {
            return ""
        }

    })

    return (
        <>
            {link}
        </>
    )
}
