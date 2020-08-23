import React from "react"
import { Link } from "gatsby"

import { rhythm, scale } from "../utils/typography"

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  let header

  const renderHeader = () => {
    return (
      <h1 className='my-0' style={{
        ...scale(0.75),
      }}>
        <Link
          className='text-textTitle'
          style={{
            boxShadow: 'none',
            textDecoration: 'none',
          }}
          to={'/'}
      >
          {title}
        </Link>
      </h1>

    )

  }

  return (
    <div className='min-h-screen bg-background text-textNormal'>
      {/* Helmet */}
      <div className='mx-auto' style={{
        maxWidth: rhythm(24),
        padding: `2.625rem ${rhythm(3 / 4)}`,
      }}>
        <header className='flex justify-between items-center' style={{
          marginBottom: '2.625rem'
        }}>
          {renderHeader()}
          {/* TODO: theme toggle */}
        </header>
        {children}
      </div>
    </div>
  )
}

export default Layout
