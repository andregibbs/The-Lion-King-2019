/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require(`path`);

exports.createPages = ({ graphql, actions }) => {
    const { createPage } = actions
    return new Promise((resolve, reject) => {
        graphql(`
            {
                allPagesJson {
                    edges {
                        node {
                            id
                            path
                        }
                    }
                }
            }
        `).then(result => {
            if (result.errors) reject(result.errors)

            // Sites
            const pages = result.data.allPagesJson.edges

            // Sites pages
            pages.forEach( ({ node })  => {
                // Create the page
                createPage({
                    path: node.path,
                    component: path.resolve(`./src/templates/TemplateSelector.js`),
                    context: {
                        // Data passed to context is available in page queries as GraphQL variables.
                        id: node.id,
                    },
                })
            })

            resolve()
        })
    })
};