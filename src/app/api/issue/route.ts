import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
export const createIssueSchema = z.object({
    title: z.string().min(1).max(255),
    description: z.string().min(1)
});
const prisma = new PrismaClient()
// use `prisma` in your application to read and write data in your DB

export async function POST(request: NextRequest) {
    const body = await request.json();
    const validation = createIssueSchema.safeParse(body);
    if (!validation.success) {
        return NextResponse.json(validation.error.errors, { status: 400 });
    }
    // import single prisma client
    // google how to create prisma client in /prisma/client.ts.
    const newIssue = await prisma.issue.create({
        data: { title: body.title, description: body.description },
      });
    return NextResponse.json(newIssue, { status: 201 })
}