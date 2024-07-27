"use client"
import React, { useEffect, useState } from 'react'
import AddNewInterview from './_components/AddNewInterview'
import InterviewList from './_components/InterviewList'

function page() {
  return (
    <div className=''>
      
      <h2 className='font-bold text-2xl'>Dashboard</h2>
      <h2 className='text-gray-500'>Create and start your AI Interview Mocker </h2>
      <div className='grid grid-cols-1 md:grid-cols-3 my-5'>
        <AddNewInterview/>
      </div>
      
      {/* previous interview List */}
      <InterviewList/>
    </div>
  )
}

export default page
