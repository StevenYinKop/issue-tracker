import ValidationError from '@/app/schemas/ValidationError';
import { updateIssueSchema } from '@/app/schemas/issueSchema';
import prisma from '@p/client';
import { Issue } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        await checkUserSession();
        const body: Issue = await request.json();
        const validation = updateIssueSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json(validation.error.errors, { status: 400 });
        }
        const { assignee, title, description } = body;
        await checkIssueValidation(params.id);
        if (assignee) await checkUserValidation(assignee!);
        // import single prisma client
        // google how to create prisma client in /prisma/client.ts.
        const updatedIssue = await prisma.issue.update({
            where: { id: parseInt(params.id) },
            data: { title, description, assignee },
        });
        return NextResponse.json(updatedIssue, { status: 200 })
    } catch (error) {
        if (error instanceof ValidationError) {
            return error.getResponse();
        }
        throw error;
    }
}


export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        await checkUserSession();
        await checkIssueValidation(params.id);
        const deletedIssue = await prisma.issue.delete({
            where: { id: parseInt(params.id) }
        });
        return NextResponse.json(deletedIssue, { status: 200 })
    } catch (error) {
        if (error instanceof ValidationError) {
            return error.getResponse();
        }
        throw error;
    }
}

async function checkUserSession() {
    const session = await getServerSession();
    if (!session) {
        throw new ValidationError({}, 401);
    }
}
async function checkUserValidation(id: string) {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
        throw new ValidationError("Can't find the user!", 400);
    }
};

async function checkIssueValidation(id: string) {
    const issue = await prisma.issue.findUnique({ where: { id: parseInt(id) } })
    if (!issue) {
        throw new ValidationError("Can't find the issue!", 404);
    }
};

