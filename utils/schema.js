import { pgTable, text, varchar, serial } from "drizzle-orm/pg-core";

export const MockInterview = pgTable('mockInterview', {
    id: serial('id').primaryKey(),
    jsonMockResp: text('jsonMockResp').notNull(),
    jobPosition: varchar('jobPosition', 255).notNull(),
    jobDesc: varchar('jobDesc', 255).notNull(),
    jobExperience: varchar('jobExperience', 255).notNull(),
    createdBy: varchar('createdBy', 255).notNull(),
    createdAt: varchar('createdAt', 255),
    mockId: varchar('mockId', 255).notNull(),
});

export const UserAnswer = pgTable('userAnswer', {
    id: serial('id').primaryKey(),
    mockIdRef: varchar('mockId', 255).notNull(),
    question: varchar('question', 255).notNull(),
    correctAns: text('correctAns', 255),
    userAns: text('userAns'),
    feedback: text('feedback'),
    rating: varchar('rating', 255),
    userEmail: varchar('userEmail', 255),
    createdAt: varchar('createdAt', 255),
});
