import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

function InterviewItemCard({ interview }) {
    const router=useRouter()

    const onStart=()=>{
        router.push('/dashboard/interview/'+interview?.mockId)
    }
    // console.log('InterviewItemCard Props:', interview); // Check props
    
    const onFeedback=()=>{
        router.push('dashboard/interview/'+interview?.mockId+'/feedback')
    }

    return (
        <div className='border shadow-sm rounded-lg p-3 mt-5'>
            <h2 className='font-bold text-blue-700'>{interview?.jobPosition || 'No Position'}</h2>
            <h2 className='text-sm text-gray-600'>{interview?.jobExperience} years of experience</h2>
            <h2 className='text-xs text-gray-400'>Created At:{interview.createdAt}</h2>

            <div className='flex justify-between mt-2 gap-5'>
                <Button size='sm' variant='outline' className='w-full' onClick={onFeedback}>Feedback</Button>
                <Button size='sm' className='bg-blue-700 w-full' onClick={onStart}>Start</Button>
            </div>
        </div>
    );
}

export default InterviewItemCard;