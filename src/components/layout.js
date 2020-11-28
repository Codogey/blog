import React from "react"

import Header from "../components/Header"


const Layout = ({ location, title, children }) => {

  return (
    <div className='theme-dark min-h-screen bg-background text-font'>
      {/* Helmet */}
        <Header title={title}/> 
        {/* <div style={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
          background: '#111',
          paddingTop: '56px',
          paddingBottom: '56px',
          
        }}>
          <Terminal />

        </div> */}
      <div className='mx-auto' style={{
        maxWidth: '825px',
      }}>
        {children}
      </div>
    </div>
  )
}

export default Layout
