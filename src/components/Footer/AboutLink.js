import React from "react"
import { Row, Col } from 'reactstrap';
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
                <Row key={i} className="mt-3">
                    <Col lg={6}>
                        <Link to={node.path} className="btn btn--red btn--block btn--large btn--300">
                            <span>Find out more</span>
                        </Link>
                    </Col>
                    <Col lg={6} className="mt-2 mt-lg-0">
                        <Link to={node.path} className="btn btn--red btn--block btn--large btn--300">
                            <span>Watch trailer</span>
                        </Link>
                    </Col>
                </Row>
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