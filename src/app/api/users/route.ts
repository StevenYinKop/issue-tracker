import { NextRequest, NextResponse } from "next/server";
import prisma from '@p/client';

export const GET = async (nextRequest: NextRequest) => {
    const users = await prisma.user.findMany({})
    return NextResponse.json(users, { status: 200 });
}