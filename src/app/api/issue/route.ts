import { createIssueSchema } from '@/app/schemas/issueSchema';
import prisma from '@p/client';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
// const prisma = new PrismaClient()
// use `prisma` in your application to read and write data in your DB

export async function POST(request: NextRequest) {
    const session = await getServerSession();
    if (!session) {
        return NextResponse.json({}, { status: 401 });
    }
    const body = await request.json();
    const validation = createIssueSchema.safeParse(body);
    if (!validation.success) {
        return NextResponse.json(validation.error.errors, { status: 400 });
    }
    const { title, description, company, companyLink, jobLink, phoneNumber, email, tags, location, workModel } = body;
    // import single prisma client
    // google how to create prisma client in /prisma/client.ts.
    const newIssue = await prisma.issue.create({
        data: { title, description, company, companyLink, jobLink, phoneNumber, email, tags, location, workModel },
    });
    return NextResponse.json(newIssue, { status: 201 })
}
