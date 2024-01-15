import { NextRequest, NextResponse } from "next/server";
import prisma from '@p/client';

export async function GET(nextRequest: NextRequest) {
    const users = await prisma.user.findMany({})
    return NextResponse.json(users, { status: 200 });
}

export const dynamic = 'force-dynamic';