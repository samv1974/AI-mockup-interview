import { Lightbulb, Volume2 } from 'lucide-react'
import React from 'react'

function Question({mockInterviewQuestion,activeQuestionIndex}) {

    const textToSpeach=(text)=>{
        if('speechSynthesis' in window){
            const speach = new SpeechSynthesisUtterance(text)
            window.speechSynthesis.speak(speach)
        }
        else
        {
            alert('Sorry your browser is not compatible in text to speach')
        }
    }
  return mockInterviewQuestion&&(
    <div className='p-5 rounded-lg border my-10'>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
        {mockInterviewQuestion&&mockInterviewQuestion.map((question,index)=>(
            <h2 className={`p-2 bg-secondary rounded-full text-xs md:text:sm text-center cursor-pointer ${activeQuestionIndex==index&&'bg-blue-800 text-white'}`}>Question #{index+1}</h2>
        ))}

      </div>
        <h2 className='my-5 text-md md:text-lg'>{mockInterviewQuestion[activeQuestionIndex]?.question}</h2>
        <Volume2 className='cursor-pointer' onClick={()=>textToSpeach(mockInterviewQuestion[activeQuestionIndex]?.question)}/>
        <div className='border rounded-lg p-5 bg-blue-100 mt-20'>
            <h2 className='flex gap-2 items-center text-blue-700'>
                <Lightbulb/>
                <strong>Note:</strong>
            </h2>
            <h2 className='ml-2 text-sm text-blue-600'>Click on record when you want to answer the question.At the end of interview we will give you the feedback along with apt answer for each question to compare it with your answer.</h2>
        </div>
    </div>
  )
}

export default Question
