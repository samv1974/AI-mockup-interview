'use client'
import { Button } from '@/components/ui/button'
import { db } from '@/utils/db'
import { MockInterview } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { Lightbulb, WebcamIcon } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'

function Interview({ params }) {
    const [interviewData, setInterviewData] = useState(null)
    const [webcamEnabled, setWebcamEnabled] = useState(false)

    useEffect(() => {
        console.log(params.InterviewId)
        GetInterviewDetails()
    }, [])

    // used to get interview details by mockid/interview ID
    const GetInterviewDetails = async () => {
        try {
            const result = await db.select().from(MockInterview)
                .where(eq(MockInterview.mockId, params.InterviewId))
            
            console.log('Database result:', result)
            
            if (result.length > 0) {
                setInterviewData(result[0]) // Assuming result is an array and we need the first item
                console.log('Interview data set:', result[0])
            } else {
                console.log('No data found for the given Interview ID')
            }
        } catch (error) {
            console.error('Error fetching interview data:', error)
        }
    }

    return (
        <div className='my-10 '>
            <h2 className='font-bold text-2xl'>Let's Get Started</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10 mt-10'>
                    {interviewData ? (
                        <div className='flex flex-col my-5 gap-5'>
                            <div className='flex flex-col gap-5 p-5 rounded-lg border'>

                            <h2 className='text-lg'><strong>Job Role/Job Position:</strong> {interviewData.jobPosition}</h2>
                            <h2 className='text-lg'><strong>Job Description/Tech Stack:</strong> {interviewData.jobDesc}</h2>
                            <h2 className='text-lg'><strong>Years of Experience:</strong> {interviewData.jobExperience}</h2>
                            </div>
                            <div className='p-5 rounded-lg border border-yellow-300 bg-yellow-100'>
                                <h2 className='flex gap-2 items-center text-yellow-600'><Lightbulb/><strong>Information</strong></h2>
                                <h2 className='mt-3 ml-2 text-yellow-500'>Enable Video WebCam and Microphone to start your AI generated Mock interview , It has 5 questions which you have to answer and at last you will get the report on basis of your answer.</h2>
                            </div>
                        </div>
                    ) : (
                        <p>Loading interview data...</p>
                    )}
                <div className='flex flex-col items-center'>
                    {webcamEnabled ? (
                        <Webcam
                            onUserMedia={() => setWebcamEnabled(true)}
                            onUserMediaError={() => setWebcamEnabled(false)}
                            mirrored={true}
                            style={{
                                height: 300,
                                width: 300
                            }}
                        />
                    ) : (
                        <>
                            <WebcamIcon className='h-72 w-full my-7 p-20 bg-secondary rounded-lg border' />
                            <Button variant="ghost" className='w-full' onClick={() => setWebcamEnabled(true)}>Enable Web Cam and Microphone</Button>
                        </>
                    )}
                </div>

            </div>
            <div className='flex justify-end items-end mt-5'>
                <Link href={'/dashboard/interview/'+params.InterviewId+'/start'}>
                    <Button>Start Interview</Button>
                </Link>

            </div>
        </div>
    )
}

export default Interview
