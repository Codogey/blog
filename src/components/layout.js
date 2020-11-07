import React from "react"

import Header from "../components/Header"

const Layout = ({ location, title, children }) => {

  return (
    <div className='min-h-screen bg-background text-textNormal'>
      {/* Helmet */}
      <div className='mx-auto' style={{
        maxWidth: '825px',
      }}>
        <header className='flex justify-between items-center' style={{
          marginBottom: '2.625rem'
        }}>
          <Header title={title}/> 
        </header>
        {children}
      </div>
    </div>
  )
}

export default Layout
