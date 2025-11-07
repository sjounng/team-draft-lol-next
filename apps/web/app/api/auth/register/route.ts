import { NextRequest } from "next/server";
import { hash } from "bcryptjs";
import { prisma } from "@/app/lib/prisma";
import { signToken } from "@/app/lib/jwt";
import { successResponse, errorResponse } from "@/app/lib/api-response";
import { cookies } from "next/headers";
import { getRankedScore } from "@/app/lib/riot-api";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, email, password, name, riotId, riotTag, mainLane, subLane } = body;

    if (!username || !email || !password) {
      return errorResponse("Username, email, and password are required");
    }

    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existingUser) {
      return errorResponse(
        "User already exists with this email or username",
        409
      );
    }

    // Hash password
    const hashedPassword = await hash(password, 10);

    // Fetch ranked score from Riot API if Riot ID is provided
    let initialScore = 0;
    if (riotId && riotTag) {
      try {
        initialScore = await getRankedScore(riotId, riotTag);
        console.log(`Fetched score for ${riotId}#${riotTag}: ${initialScore}`);
      } catch (error) {
        console.error('Error fetching Riot rank, using default score 0:', error);
      }
    }

    // Create user
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        name: name || username,
        riotId: riotId || null,
        riotTag: riotTag || null,
        mainLane: mainLane || null,
        subLane: subLane || null,
        score: initialScore,
        winLossStreak: 0,
      },
    });

    // Generate JWT token
    const token = signToken({
      userId: user.id,
      email: user.email,
      username: user.username,
    });

    // Set cookie
    const cookieStore = await cookies();
    cookieStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return successResponse(
      {
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          name: user.name,
          riotId: user.riotId,
          riotTag: user.riotTag,
          mainLane: user.mainLane,
          subLane: user.subLane,
          score: user.score,
          winLossStreak: user.winLossStreak,
        },
        token,
      },
      201
    );
  } catch (error) {
    console.error("Error registering user:", error);
    return errorResponse("Failed to register user", 500);
  }
}
