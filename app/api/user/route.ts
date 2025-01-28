import prisma from "@/app/db";
import { NEXT_AUTH } from "@/app/lib/auth";
import { Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const session = await getServerSession(NEXT_AUTH);

  if (!session || !session.user) {
    return NextResponse.json(
      {
        error: "Unauthorized access! Not logged in."
      },
      {
        status: 403
      }
    );
  }

  // Validating username
  const url = request.nextUrl;
  const username = url.searchParams.get("username");
  if (!username) {
    return NextResponse.json(
      {
        error: "Bad Request"
      },
      {
        status: 400
      }
    );
  }

  const validUsername = z.string().regex(/^[a-zA-Z0-9-]+$/).safeParse(username);
  if (!validUsername.success) {
    return NextResponse.json(
      {
        error: "Bad Request"
      },
      {
        status: 400
      }
    );
  }

  try {
    const result = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      const user = await tx.participant.findFirst({
        where: {
          username: validUsername.data,
          accountActive: true,
        }
      });

      if (!user) {
        throw new Error("Account does not exist");
      }

      // Get all issues for the user
      const issues = await tx.issue.findMany({
        where: {
          claimedBy: user.username,
        },
        select: {
          issueStatus: true,
          url: true,
          issueId: true,
          repoId: true
        }
      });

      // Get all solutions (PRs) for the user
      const solutions = await tx.solution.findMany({
        where: {
          username: user.username,
        },
        select: {
          repoId: true,
        }
      });

      // Group solutions by repoId for easier counting
      const solutionsByRepo = solutions.reduce((acc, sol) => {
        acc[sol.repoId] = (acc[sol.repoId] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      // Process issues to include PR counts
      const processedIssues = issues.map(issue => ({
        ...issue,
        prCount: solutionsByRepo[issue.repoId] || 0
      }));

      // Separate completed and incomplete issues
      const completedIssues = processedIssues.filter(i => i.issueStatus);
      const incompleteIssues = processedIssues.filter(i => !i.issueStatus);

      return {
        fullname: user.fullName,
        rollNumber: user.rollNumber,
        username: user.username,
        completedIssues,
        incompleteIssues,
        completedCount: completedIssues.length,
        incompleteCount: incompleteIssues.length,
        bounty: user.bounty
      };
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal Server Error"
      },
      {
        status: 500
      }
    );
  }
}