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
                            <div className="hover:bg-background-hover text-font p-3 rounded-lg flex justify-between">
                                <div className='flex items-center'>
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
                    </article>
                )
            })}
        </Fragment>
    )
}

export default PostList