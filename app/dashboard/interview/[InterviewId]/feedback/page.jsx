"use client"
import { db } from '@/utils/db'
import { UserAnswer } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
  } from "@/components/ui/collapsible"
import { ChevronsDownUpIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'

function Feedback({ params }) {
    const [feedbackList, setFeedbackList] = useState([]);
    const [averageRating, setAverageRating] = useState(null);
    const router = useRouter();

    useEffect(() => {
        getFeedback();
    }, []);

    const getFeedback = async () => {
        try {
            const result = await db.select()
                .from(UserAnswer)
                .where(eq(UserAnswer.mockIdRef, params.InterviewId))
                .orderBy(UserAnswer.id);

            console.log('Fetched Feedback:', result);
            setFeedbackList(result);

            // Calculate average rating
            const totalRating = result.reduce((sum, item) => {
                const rating = parseFloat(item.rating);
                return !isNaN(rating) ? sum + rating : sum;
            }, 0);

            const avgRating = result.length > 0 ? totalRating / result.length : 0;
            setAverageRating(avgRating.toFixed(1)); // Format to one decimal place

        } catch (error) {
            console.error('Error fetching feedback:', error);
        }
    }

    return (
        <div className='p-10'>

            {feedbackList?.length==0?
            <h2 className='font-bold text-xl text-grey-700'>No Interview Record Found</h2> 
            : 
            <>
            <h2 className='text-3xl font-bold text-green-600'>Congratulations!</h2>
            <h2 className='font-bold text-2xl'>Here is your interview feedback</h2>
            <h2 className='text-lg text-blue-700 my-3'>
                Your overall interview rating: <strong>{averageRating !== null ? `${averageRating}/5` : 'Calculating...'}</strong>
            </h2>

            <h2 className='text-sm text-gray-500'>
                Find below interview question with an ideal answer, Your answer, and feedback for improvement
            </h2>

            {feedbackList && feedbackList.length > 0 ? (
              feedbackList.map((item, index) => (
                <Collapsible key={index} className='mt-7'>
                <CollapsibleTrigger className='p-2 bg-secondary flex justify-between text-sm rounded-lg my-2 text-left gap-7 w-full'>
                {item.question} <ChevronsDownUpIcon className='h-5 w-5' />
                </CollapsibleTrigger>
                <CollapsibleContent>
                <div className='flex flex-col gap-2'>
                <h2 className='text-red-500 p-2 rounded-lg border'><strong>Rating: </strong>{item.rating}</h2>
                <h2 className='border rounded-lg p-2 bg-red-50 text-sm text-red-900'><strong>Your Answer: </strong>{item.userAns}</h2>
                <h2 className='border rounded-lg p-2 bg-green-50 text-sm text-green-900'><strong>Ideal Answer: </strong>{item.correctAns}</h2>
                <h2 className='border rounded-lg p-2 bg-blue-50 text-sm text-blue-900'><strong>Feedback: </strong>{item.feedback}</h2>
                </div>
                </CollapsibleContent>
                </Collapsible>
                ))
                ) : (
                  <p>No feedback available</p>
                  )}

          </>
          }
            <Button className='bg-blue-700' onClick={() => router.replace('/dashboard')}>Go Home</Button>
        </div>
    );
}

export default Feedback;
