"use client";
import { v4 as uuidv4 } from 'uuid';
import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "@/utils/GeminiAiModel";
import { LoaderCircle } from "lucide-react";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { useUser } from '@clerk/nextjs';
import moment from 'moment';
import { useRouter } from 'next/navigation';

function AddNewInterview() {
    const [openDialog, setOpenDialog] = useState(false);
    const [jobPosition, setJobPosition] = useState("");
    const [jobDesc, setJobDesc] = useState("");
    const [jobExperience, setJobExperience] = useState("");
    const [loading, setLoading] = useState(false);
    const [jsonResponse, setJsonResponse] = useState([]);
    const { user } = useUser();
    const router = useRouter();

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const InputPrompt = `Job position: ${jobPosition}, Job description: ${jobDesc}, Job Experience: ${jobExperience}, depending on Job Position, Job description and years of experience give us 5 interview questions along with answer in json format, give us question and answer field on JSON.(Dont give any additional text just give me json format response)`;

        const result = await chatSession.sendMessage(InputPrompt);
        const responseText = await result.response.text();

        // Extract JSON part from the response
        const jsonStart = responseText.indexOf("[");
        const jsonEnd = responseText.lastIndexOf("]") + 1;
        const mockJsonResp = responseText.substring(jsonStart, jsonEnd).trim();
        setJsonResponse(mockJsonResp);

        if (mockJsonResp) {
            const email = user?.primaryEmailAddress?.emailAddress;
            const resp = await db.insert(MockInterview).values({
                mockId: uuidv4(),
                jsonMockResp: mockJsonResp,
                jobPosition: jobPosition,
                jobDesc: jobDesc,
                jobExperience: jobExperience,
                createdBy: email,
                createdAt: moment().format('DD-MM-YYYY')
            }).returning({ mockId: MockInterview.mockId });
            console.log('Inserted ID:', resp);
            if(resp)
            {   

                setOpenDialog(false)
                router.push('dashboard/interview/'+resp[0]?.mockId)
            }
        }
        else
        {
            console.log('ERROR')
        }
        
        setLoading(false);
    };

    return (
        <div>
            <div className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all" onClick={() => setOpenDialog(true)}>
                <h2 className="text-lg text-center">+ Add New</h2>
            </div>
            <Dialog open={openDialog}>
                <DialogContent className="max-w-xl">
                    <DialogHeader>
                        <DialogTitle className="text-2xl">Tell us more about your job interview</DialogTitle>
                        <DialogDescription>
                            <form onSubmit={onSubmit}>
                                <div>
                                    <h2>Add details of your job position/role, Job description, and years of experience</h2>
                                    <div className="mt-7 my-3">
                                        <label>Job Role/Job Position</label>
                                        <Input
                                            placeholder="Ex. Full Stack Developer"
                                            required
                                            onChange={(event) => setJobPosition(event.target.value)}
                                        />
                                    </div>
                                    <div className="mt-7 my-3">
                                        <label>Job Description/Tech stack (In short)</label>
                                        <Textarea
                                            placeholder="Ex. React, Angular, Nodejs, MySQL etc."
                                            required
                                            onChange={(event) => setJobDesc(event.target.value)}
                                        />
                                    </div>
                                    <div className="mt-7 my-3">
                                        <label>Years of Experience</label>
                                        <Input
                                            placeholder="Ex. 5"
                                            max="50"
                                            type="number"
                                            required
                                            onChange={(event) => setJobExperience(event.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="flex gap-5 justify-end">
                                    <Button type="button" variant="ghost" onClick={() => setOpenDialog(false)}>Cancel</Button>
                                    <Button type="submit" disabled={loading}>
                                        {loading ? (
                                            <>
                                                <LoaderCircle className="animate-spin" /> Generating from AI
                                            </>
                                        ) : (
                                            'Start Interview'
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default AddNewInterview;
