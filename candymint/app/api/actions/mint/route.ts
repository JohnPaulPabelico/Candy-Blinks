import {
  ACTIONS_CORS_HEADERS,
  ActionGetResponse,
  ActionPostRequest,
  ActionPostResponse,
  createPostResponse,
} from "@solana/actions";
import { mintTransaction } from "./mintTransaction";

export const GET = async (req: Request) => {
  const payload: ActionGetResponse = {
    title: "Mint a Spud Mate",
    icon: "https://spudsquad.vercel.app/Gallery%20Images/6.svg",
    description: "Join the Spud Squad now!",
    label: "Mint Spud Mate 0.05 SOL",
  };

  return Response.json(payload, {
    headers: ACTIONS_CORS_HEADERS,
  });
};

export const OPTIONS = GET;

export const POST = async (req: Request) => {
  const body: ActionPostRequest = await req.json();

  const userPubKey = body.account;

  const transaction = await mintTransaction({
    toAddress: userPubKey,
  });

  const payload: ActionPostResponse = await createPostResponse({
    fields: {
      transaction,
      message: `Hello there ${body.account}`,
    },
  });
  return Response.json(payload, {
    headers: ACTIONS_CORS_HEADERS,
  });
};
