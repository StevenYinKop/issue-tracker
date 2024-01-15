import { WorkModel } from '@prisma/client';
import { z } from 'zod';
import regexp from './regexpCheatsheet';

export const createIssueSchema = z.object({
    title: z.string().min(1).max(255).nonempty(),
    description: z.string().min(1).nonempty(),
    company: z.string().min(1).max(255).nonempty(),
    companyLink: z.string().url().nonempty(),
    jobLink: z.string().url().nonempty(),
    phoneNumber: z.string().regex(regexp.phoneNumber).nonempty(),
    email: z.string().max(255).email().optional(),
    location: z.string().max(255).optional(),
    tags: z.string().max(255).optional(),
    workModel: z.nativeEnum(WorkModel)
});
export const updateIssueSchema = z.object({
    title: z.string().min(1).max(255).optional(),
    description: z.string().min(1).optional(),
    assignee: z.string().min(1).max(255).optional(),
    company: z.string().min(1).max(255).nonempty(),
    companyLink: z.string().url().nonempty(),
    jobLink: z.string().url().nonempty(),
    phoneNumber: z.string().regex(regexp.phoneNumber).nonempty(),
    email: z.string().max(255).email().optional(),
    location: z.string().max(255).optional(),
    tags: z.string().max(255).optional(),
    workModel: z.nativeEnum(WorkModel)
});
