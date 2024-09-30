import { NextResponse } from "next/server";
import service from "../services/whitelist.service";
import { connectDB, transaction } from "../utils/transaction";
import { startSession, ClientSession } from "mongoose";

export async function GET(request: Request) {
  return NextResponse.json({ msg: "Hello from server" });
}

export async function POST(request: Request) {
  await connectDB();

  const session: ClientSession = await startSession();
  const { walletAddress } = await request.json();

  try {
    return NextResponse.json(
      await transaction(
        session,
        async () => {
          return await service.add({ walletAddress }, session);
        },
        "Create user"
      )
    );
  } catch (_: any) {
    console.log("error");
  }

  return NextResponse.json({});
}
