import React from "react"

import Header from "../components/Header"

const Layout = ({ location, title, children }) => {

  return (
    <div className='theme-dark min-h-screen bg-background text-font'>
      {/* Helmet */}
      <div className='mx-auto' style={{
        maxWidth: '825px',
      }}>
        <header className='flex justify-between items-center'>
          <Header title={title}/> 
        </header>
        {children}
      </div>
    </div>
  )
}

export default Layout
