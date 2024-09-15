import {
  createActionHeaders,
  NextActionPostRequest,
  ActionError,
  ActionPostResponse,
  ACTIONS_CORS_HEADERS,
  createPostResponse,
} from "@solana/actions";
import { transferSolTransaction, transferSPL } from "./spl-transfer";

const headers = createActionHeaders();

export const GET = async (req: Request) => {
  return Response.json({ message: "Method not supported" } as ActionError, {
    status: 403,
    headers,
  });
};

export const OPTIONS = async () => Response.json(null, { headers });

export const POST = async (req: Request) => {
  const body: NextActionPostRequest = await req.json();
  console.log(body);

  // const transaction = await transferSolTransaction({
  //   from: body.account,
  //   amount: 0.1,
  // });

  const transaction = await transferSPL({
    senderAddress: body.account,
    recipientAddress: "9QZqqJfKRuoGKTaCgUvjQMMUNpaxhPC3fvn2y8iPZ4uU",
    amount: 1,
    tokenAddress: "CXk2AMBfi3TwaEL2468s6zP8xq9NxTXjp9gjMgzeUynM",
  });

  const payload: ActionPostResponse = await createPostResponse({
    fields: {
      transaction,
      message: `Tipped 1 PYUSD`,
    },
  });
  return Response.json(payload, {
    headers: ACTIONS_CORS_HEADERS,
  });
};
