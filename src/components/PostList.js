import React, { Fragment } from 'react'
import { Link } from "gatsby"
import Tag from './Tag'

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
                const title = node.frontmatter.title || node.slug
                const tags = node.frontmatter.tags || []
                return (
                    <article key={node.slug}>
                        <Link to={node.slug}>
                            <div className="hover:bg-background-hover text-font py-3 rounded-lg flex justify-between">
                                <div className='flex'>
                                    <time className="flex-grow-0 flex-shrink-0 w-16 text-time font-normal text-small">{formatDate(node.frontmatter.date)}</time>
                                    <h3 className="text-xl font-bold">
                                        { title }
                                    </h3>
                                </div>
                                <div className='hidden items-center mt-2 lg:flex'>
                                    {tags.map((tag) => {
                                        return (
                                            <Tag tag={tag}/>
                                        )
                                    })}
                                </div>
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