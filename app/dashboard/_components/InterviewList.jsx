import React, { useEffect, useState } from 'react';
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { desc, eq } from 'drizzle-orm';
import { useUser } from '@clerk/nextjs';
import InterviewItemCard from './InterviewItemCard';

function InterviewList() {
    const { user, isLoaded } = useUser(); // Destructure to get user and isLoaded
    const [interviewList, setInterviewList] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (isLoaded && user) {
            console.log('User:', user); // Debug user object
            getInterviewList();
        }
    }, [isLoaded, user]); // Add isLoaded to dependencies

    const getInterviewList = async () => {
        try {
            const result = await db.select()
                .from(MockInterview)
                .where(eq(MockInterview.createdBy, user?.primaryEmailAddress?.emailAddress))
                .orderBy(desc(MockInterview.id));
            
            console.log('Fetched Interviews:', result); // Check data structure here
            setInterviewList(result);
        } catch (error) {
            console.error('Error fetching interviews:', error);
            setError('Failed to load interviews.');
        }
    };

    return (
        <div>
            <h2 className='font-medium text-xl'>Previous Mock Interviews</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3'>
                {error && <p className='text-red-500'>{error}</p>}
                {interviewList.length > 0 ? (
                    interviewList.map((interview, index) => (
                        <InterviewItemCard
                            interview={interview}
                            key={index}
                        />
                    ))
                ) : (
                    <p>No interviews found</p>
                )}
            </div>
        </div>
    );
}

export default InterviewList;
