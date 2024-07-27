import React from 'react'
import Header from './_components/Header'

function DashboardLayout({children}) {
  return (
    <>
    <Header/>
    <div className='mx-5 md:mx-20 lg:mx-36'>
      {children}
    </div>
    </>
  )
}

export default DashboardLayout
