const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
// For mdx components import
exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
  })
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const result = await graphql(
    `
      {
        allMdx(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              slug
              fields {
                langKey
                directoryName
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
    `
  )


  if (result.errors) {
    throw result.errors
  }

  // Create blog posts pages.
  const posts = result.data.allMdx.edges

  translationsByDirectory = new Map()

  posts.forEach((post, index) => {
    const { langKey, directoryName } = post.node.fields
    if (!translationsByDirectory.has(directoryName)) {
      translationsByDirectory.set(directoryName, [])
    }
    translationsByDirectory.get(directoryName).push(langKey)
  });


  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node

    const { directoryName } = post.node.fields

    const translations = translationsByDirectory.get(directoryName)

    createPage({
      path: post.node.slug,
      component: blogPost,
      context: {
        slug: post.node.slug,
        previous,
        next,
        translations,
      },
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `Mdx`) {
    createNodeField({
      node,
      name: 'directoryName',
      value: path.basename(path.dirname(node.fileAbsolutePath)),
    });

    // HACK: remove these hacks
    createNodeField({
      node,
      name: 'langKey',
      value: 'en',
    });
  }
}
