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
              fields {
                langKey
                directoryName
                slug
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

    const { directoryName, langKey, slug } = post.node.fields

    const translations = translationsByDirectory.get(directoryName)

    let path
    if (langKey === 'en') {
      path = `/${slug}/`
    } else {
      path = `/${langKey}/${slug}/` 
    }


    createPage({
      path: path,
      component: blogPost,
      context: {
        slug: slug,
        langKey: langKey,
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

    const {slug, langKey} = getSlugAndLangKey(node.fileAbsolutePath)
    createNodeField({
      node,
      name: 'slug',
      value: slug,
    });
    createNodeField({
      node,
      name: 'langKey',
      value: langKey,
    });
  }
}

const getSlugAndLangKey = (filePath) => {
  // Split by / and then get the last element
  const filePathArgs = filePath.split('/').slice(-2)
  const slug = filePathArgs[0]
  const fileName = filePathArgs[1]
  const args = fileName.split('.')
  let langKey
  if (args.length === 2) {
    // it's index.md or index.mdx, use default lang
    langKey = 'en'
  } else {
    langKey = fileName.split('.')[1]
  }
    return {slug, langKey}
}
