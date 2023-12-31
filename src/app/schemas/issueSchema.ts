import { z } from 'zod';
export const createIssueSchema = z.object({
    title: z.string().min(1).max(255).optional(),
    description: z.string().min(1).optional()
});
export const updateIssueSchema = z.object({
    title: z.string().min(1).max(255).optional(),
    description: z.string().min(1).optional(),
    assignee: z.string().min(1).max(255).optional()
});