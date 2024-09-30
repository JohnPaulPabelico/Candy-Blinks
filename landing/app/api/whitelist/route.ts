//app/api/test/route.js

import { NextResponse } from "next/server";
import service from "../services/whitelist.service";
import { transaction } from "../utils/transaction";
import { startSession, ClientSession } from "mongoose";
import mongoose, { mongo } from "mongoose";

export async function GET(request: Request) {
  return NextResponse.json({ msg: "Hello from server" });
}

export async function POST(request: Request) {
  await mongoose.connect(
    "mongodb+srv://admin:admin@cluster0.dceq2mc.mongodb.net/candy-blinks?retryWrites=true&w=majority"
  );

  const session: ClientSession = await startSession();
  const { walletAddress } = await request.json();

  return NextResponse.json(
    await transaction(
      session,
      async () => {
        return await service.add({ walletAddress }, session);
      },
      "Create user"
    )
  );
}
