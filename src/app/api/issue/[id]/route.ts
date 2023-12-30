import prisma from '@p/client';
import { NextRequest, NextResponse } from "next/server";
import { issueSchema } from '@/app/schemas/issueSchema';

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
    const issue = await prisma.issue.findUnique({ where: { id: parseInt(params.id) } })
    if (!issue)
        return NextResponse.json("Not Found!", { status: 404 });
    const body = await request.json();
    const validation = issueSchema.safeParse(body);
    if (!validation.success) {
        return NextResponse.json(validation.error.errors, { status: 400 });
    }
    // import single prisma client
    // google how to create prisma client in /prisma/client.ts.
    const updatedIssue = await prisma.issue.update({
        where: { id: parseInt(params.id) },
        data: { title: body.title, description: body.description },
    });
    return NextResponse.json(updatedIssue, { status: 200 })
}


export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    const issue = await prisma.issue.findUnique({ where: { id: parseInt(params.id) } })
    if (!issue)
        return NextResponse.json("Not Found!", { status: 404 });
    const deletedIssue = await prisma.issue.delete({
        where: { id: parseInt(params.id) }
    });
    return NextResponse.json(deletedIssue, { status: 200 })
}
