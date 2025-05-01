import prisma from '@/app/db';
import { NextResponse } from 'next/server';

export async function GET() {
  // Fetch all participants from the leaderboard based on bounty and return
  try {
    const data = await prisma.participant.findMany({
      select: {
        fullName: true,
        username: true,
        bounty: true,
        accountActive: true,
        _count: {
          select: {
            Solution: true,
          },
        },
      },
      orderBy: {
        bounty: 'desc',
      },
    });
    return NextResponse.json(
      {
        leaderboard: data,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: 'Internal Server Error',
      },
      {
        status: 500,
      },
    );
  }
}
