/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require(`path`);
const crypto = require(`crypto`);

exports.createPages = ({ graphql, actions }) => {
    const { createPage, createNode } = actions
    return new Promise((resolve, reject) => {
        graphql(`
            {
                allSitesJson {
                    edges {
                        node {
                            id
                            path
                            title
                            pages {
                                id
                                template
                                path
                                title
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
                    }
                }
            }
        `).then(result => {
            if (result.errors) reject(result.errors)

            // Sites
            const sites = result.data.allSitesJson.edges

            sites.forEach(({ node }) => {

                // Sites pages
                node.pages.forEach( (page) => {

                    // Add page to custom pages node
                    createNode({
                        path: page.path,
                        title: page.title,
                        template: page.template,
                        headerImage: page.headerImage,
                        headerImageMobile: page.headerImageMobile,

                        // Required fields.
                        id: `${node.id}__${page.id}`,
                        parent: null,
                        children: [],
                        internal: {
                            type: `Pages`,
                            contentDigest: crypto
                                .createHash(`md5`)
                                .update(JSON.stringify(page))
                                .digest(`hex`)
                        }
                    })

                    // Create the page
                    createPage({
                        path: page.path,
                        component: path.resolve(`./src/templates/TemplateSelector.js`),
                        context: {
                            // Data passed to context is available in page queries as GraphQL variables.
                            id: page.id,
                        },
                    });
                })

            });
            resolve()
        })
    })
};