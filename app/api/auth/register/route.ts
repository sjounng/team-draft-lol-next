import { NextRequest } from "next/server";
import { hash } from "bcryptjs";
import { prisma } from "@/app/lib/prisma";
import { signToken } from "@/app/lib/jwt";
import { successResponse, errorResponse } from "@/app/lib/api-response";
import { cookies } from "next/headers";
import { getRankedScore, verifyRiotAccount } from "@/app/lib/riot-api";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, email, password, name, riotId, riotTag, mainLane, subLane } = body;

    if (!username || !email || !password) {
      return errorResponse("Username, email, and password are required");
    }

    if (!riotId || !riotTag) {
      return errorResponse("라이엇 계정은 필수입니다.");
    }

    if (!mainLane || !subLane) {
      return errorResponse("메인 포지션과 서브 포지션은 필수입니다.");
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

    // Verify Riot account
    try {
      const isValidAccount = await verifyRiotAccount(riotId, riotTag);
      if (!isValidAccount) {
        return errorResponse(
          "라이엇 계정을 찾을 수 없습니다. 계정명과 태그를 확인해주세요.",
          400
        );
      }
    } catch (error: any) {
      console.error('Error verifying Riot account:', error);
      return errorResponse(
        "라이엇 계정 확인 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
        500
      );
    }

    // Hash password
    const hashedPassword = await hash(password, 10);

    // Fetch ranked score from Riot API
    const initialScore = await getRankedScore(riotId, riotTag);

    if (initialScore === null) {
      return errorResponse(
        "랭크 정보를 불러올 수 없습니다. 랭크 게임을 먼저 진행해주세요.",
        400
      );
    }

    console.log(`Fetched score for ${riotId}#${riotTag}: ${initialScore}`);

    // Create user
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        name: name || username,
        riotId,
        riotTag,
        mainLane,
        subLane,
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
