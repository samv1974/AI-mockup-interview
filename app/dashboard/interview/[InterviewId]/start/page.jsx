'use client'
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import Question from './_components/Question';
import RecordAnsSection from './_components/RecordAnsSection';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function StartInterview({params}) {
    
    const [interviewData,setInterviewData]=useState()
    const [mockInterviewQuestion,setMockInterviewQuestion] = useState([])
    const [activeQuestionIndex,setActiveQuestionIndex]=useState(0)
    useEffect(()=>{
        GetInterviewDetails()
    },[]);

    const GetInterviewDetails = async () => {

            const result = await db.select().from(MockInterview)
                .where(eq(MockInterview.mockId, params.InterviewId))

                const jsonMockResp = JSON.parse(result[0].jsonMockResp)
                console.log(jsonMockResp)
                setMockInterviewQuestion(jsonMockResp)
                setInterviewData(result[0])

             
    }

  return (
    <div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
            <Question mockInterviewQuestion={mockInterviewQuestion}
            activeQuestionIndex={activeQuestionIndex}
            />

            <RecordAnsSection
            mockInterviewQuestion={mockInterviewQuestion}
            activeQuestionIndex={activeQuestionIndex}
            interviewData={interviewData}
            />
      </div>
      <div className='flex justify-end gap-6 mt-10 '>
        {activeQuestionIndex>0 && 
        <Button onClick={()=>{setActiveQuestionIndex(activeQuestionIndex-1)}} className='bg-blue-700'>Previous Question</Button>}
        {activeQuestionIndex!=mockInterviewQuestion?.length-1 &&
         <Button onClick={()=>{setActiveQuestionIndex(activeQuestionIndex+1)}} className='bg-blue-700'>Next Question</Button>}
        {activeQuestionIndex==mockInterviewQuestion?.length-1 &&
        <Link href={'/dashboard/interview/'+interviewData?.mockId+'/feedback'}>
         <Button className='bg-blue-700'>End Interview</Button>
        </Link>}
      </div>
    </div>
  )
}

export default StartInterview
