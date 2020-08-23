import React from "react"
import { Link } from "gatsby"

import { rhythm, scale } from "../utils/typography"

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  let header

  const HomeHeader = (
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
  );

  const PostPageHeader = (
    <h3
      style={{
        fontFamily: 'Montserrat, sans-serif',
        marginTop: 0,
        marginBottom: 0,
        height: 42, // because
        lineHeight: '2.625rem',
      }}
    >
      <Link
        style={{
          boxShadow: 'none',
          textDecoration: 'none',
          color: 'rgb(255, 167, 196)',
        }}
        to={'/'}
      >
        {title}
      </Link>
    </h3>

  );

  const renderHeader = () => {
    if (location.pathname === rootPath) {
      return HomeHeader;
    } else {
      return PostPageHeader;
    }
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
