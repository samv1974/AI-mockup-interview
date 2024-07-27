import { Button } from "@/components/ui/button";
import { chatSession } from "@/utils/GeminiAiModel";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { Mic } from "lucide-react";
import moment from "moment";
import React, { useEffect, useState } from "react";
import useSpeechToText from "react-hook-speech-to-text";
import Webcam from "react-webcam";
import { toast } from "sonner";

function RecordAnsSection({ mockInterviewQuestion, activeQuestionIndex, interviewData }) {
    const [userAnswer, setuserAnswer] = useState('');
    const { user } = useUser();
    const [loading, setLoading] = useState(false);

    const {
        error,
        interimResult,
        isRecording,
        results,
        setResults,
        startSpeechToText,
        stopSpeechToText,
    } = useSpeechToText({
        continuous: true,
        useLegacyResults: false,
    });

    useEffect(() => {
        results.map((result) => {
            setuserAnswer(prevAns=> prevAns + result?.transcript);
        });
    }, [results]);

    useEffect(() => {
        if (!isRecording && userAnswer?.length > 10) {
            updateUserAnswer();
        }
        // if(userAnswer?.length<10)
        // {
        //     setLoading(false)
        //     toast('Error while saving your answer , please re-record your answer')
        //     return
        // }
    },[userAnswer]);

    const startStopRecording = async () => {
        if (isRecording) {
            stopSpeechToText();
        } else {
            startSpeechToText();
        }
    };

    const updateUserAnswer = async () => {
        setLoading(true);

        const feedbackPrompt = `
            Question: ${mockInterviewQuestion[activeQuestionIndex]?.question}
            User Answer: ${userAnswer}
            Depending on the question and user answer(ignore my previous response) for the given interview question,
            please give us a rating for the answer and feedback as an area of improvement if any,
            in just 3-5 lines to improve in JSON format with rating field and feedback field
            (don't give any other text rather only give the response you are asked for)
        `;

        const result = await chatSession.sendMessage(feedbackPrompt);
        const mockJsonResp = (result.response.text()).replace('```json', '').replace('```', '');
        const JsonFeedback = JSON.parse(mockJsonResp);

        const resp = await db.insert(UserAnswer).values({
            mockIdRef: interviewData?.mockId,
            question: mockInterviewQuestion[activeQuestionIndex]?.question,
            correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
            userAns: userAnswer,
            feedback: JsonFeedback.feedback,
            rating: JsonFeedback.rating,
            userEmail: user?.primaryEmailAddress?.emailAddress,
            createdAt: moment().format('DD-MM-YYYY'),
        });

        if (resp) {
            toast('User answer recorded successfully');
            setuserAnswer('')
            setResults([])
        }
        setResults([])
        setLoading(false);
    };

    return (
        <div className="flex items-center justify-center flex-col">
            <div className="flex flex-col justify-center items-center rounded-lg pl-5 my-20 mt-20">
                <img
                    src={"https://img.freepik.com/premium-vector/realistic-white-webcam_157999-80.jpg"}
                    width={200}
                    height={200}
                    className="absolute"
                />
                <Webcam
                    className="mt-10 rounded-lg"
                    mirrored={true}
                    style={{ height: 450, width: "100%", zIndex: 10 }}
                />
            </div>
            <Button
                disabled={loading}
                variant="outline"
                className='my-0 bg-secondary hover:bg-blue-600 hover:text-white'
                onClick={startStopRecording}
            >
                {isRecording ?
                    <h2 className="text-red-600 flex gap-2">
                        <Mic />Stop Recording
                    </h2>
                    :
                    'Record Answer'}
            </Button>

            
        </div>
    );
}

export default RecordAnsSection;
