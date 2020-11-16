import React from "react"

import Header from "../components/Header"

const Layout = ({ location, title, children }) => {

  return (
    <div className='theme-dark min-h-screen bg-background text-font'>
      {/* Helmet */}
        <Header title={title}/> 
      <div className='mx-auto' style={{
        maxWidth: '825px',
      }}>
        {children}
      </div>
    </div>
  )
}

export default Layout
