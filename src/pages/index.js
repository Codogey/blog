import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import PostList from "../components/PostList"

const BlogIndex = ({ data, location }) => {

  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMdx.edges

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
      {/* <aside>
        <Bio />
      </aside> */}
      <main>
        {/* <div>
          {allTags.map((tag) => {
            return (
            <span key={tag} className='mr-2 p-1 border border-solid rounded-full text-xs'>{tag}</span>
            )
          })}
        </div> */}
        <section className='px-4'>
          <h2 className='text-textTitle lg:border-b-4 text-3xl mb-2'>Articles</h2>
          <PostList posts={posts}/>
        </section>
      </main>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(
      filter: { 
        frontmatter: {visible: {ne: false}}
        fields: { langKey: { eq: "en" } } 
      }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          excerpt
          slug
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
