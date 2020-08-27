import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges

  


  const getAvaiableTags = () => {
    let tags = new Set()
    for (let post of posts) {
      if (post.node.frontmatter.tags) {
        for (let tag of post.node.frontmatter.tags) {
          tags.add(tag)
        }
    
      }
    }
    return [...tags]
  }

  const allTags = getAvaiableTags()

  console.log(allTags)

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      <aside>
        <Bio />
      </aside>
      <main>
        {/* <div>
          {allTags.map((tag) => {
            return (
            <span key={tag} className='mr-2 p-1 border border-solid rounded-full text-xs'>{tag}</span>
            )
          })}
        </div> */}
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          const tags = node.frontmatter.tags || []
          return (
            <article key={node.fields.slug}>
              <header>
                
                <h3
                  style={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontSize: rhythm(1),
                    marginBottom: rhythm(1 / 4),
                  }}
                >
                  <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                    {title}
                  </Link>
                </h3>
                <small>{node.frontmatter.date}</small>
                <div className='flex items-center mt-2'>
                  {tags.map((tag) => {
                    return (
                    <span key={tag} className='mr-2 p-1 border border-solid rounded-full text-xs'>{tag}</span>
                    )
                  })}
                </div>
              </header>

                {/* <p
                  dangerouslySetInnerHTML={{
                    __html: node.frontmatter.description || node.excerpt,
                  }}
                /> */}
            </article>
          )
        })}
      </main>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query($langKey: String!) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: { 
        frontmatter: {visible: {ne: false}}
        fields: { langKey: { eq: $langKey } } 
      }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            tags
          }
        }
      }
    }
  }
`
