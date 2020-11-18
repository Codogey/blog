import React from 'react'
import { Link } from "gatsby"

const NavCard = ({isPrev, title, slug}) => {
    const textAlign = isPrev ? 'text-left' : 'text-right'
    return (
            <div
             className={`text-left lg:${textAlign} my-2 lg:mx-4 p-6 rounded-md bg-backgroundSecondary`}
             style={{
                flex: '0 0 calc(50% - 2rem)'
             }}
            >
                <Link to={`/${slug}`} rel={isPrev ? 'prev' : 'next'}>
                    <div>{isPrev ? 'Previous' : 'Next'}</div>
                    <div className='text-textTitle font-bold'>{title}</div>
                </Link>
            </div>
    )
}

const PageNav = ({previous, next}) => {
    return (
        <nav className='flex flex-col lg:flex-row items-stretch my-4'>
            { previous && (
                <NavCard isPrev={true} title={previous.frontmatter.title} slug={previous.slug}/>
            )}
            { next && (
                <NavCard isPrev={false} title={next.frontmatter.title} slug={next.slug}/>
            )}
        </nav>
    )
}

export default PageNav