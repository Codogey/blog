import React, { Fragment } from 'react'
import { rhythm } from "../utils/typography"
import { Link } from "gatsby"

const PostList = ({posts}) => {
    const formatDate = (date) => {
        let oDate = new Date(date);
        return oDate.toLocaleString('en-US', {
            month: "short",
            day: "numeric"
        })
    }
    return (
        <Fragment>
            {posts.map(({ node }) => {
                const title = node.frontmatter.title || node.fields.slug
                const tags = node.frontmatter.tags || []
                return (
                    <article key={node.fields.slug}>
                        <Link to={node.fields.slug}>
                            <div className="hover:bg-backgroundHover text-postTitle px-4 py-3 rounded-lg">
                                <time className="pr-12 text-time font-normal text-small">{formatDate(node.frontmatter.date)}</time>
                                <span className="text-xl font-bold">
                                    { title }
                                </span>
                            </div>
                        </Link>
                        {/* <header>
                        <div className="hover:bg-backgroundHover text-text px-4 py-3 rounded-lg">
                            <time className="pr-12">Nov 03</time>
                            <span className="text-xl font-bold">
                                { title }
                            </span>
                        </div>
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
                        </header> */}

                        {/* <p
                    dangerouslySetInnerHTML={{
                        __html: node.frontmatter.description || node.excerpt,
                    }}
                    /> */}
                    </article>
                )
            })}
        </Fragment>
    )
}

export default PostList