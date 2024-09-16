import {
  createActionHeaders,
  NextActionPostRequest,
  ActionError,
  ActionPostResponse,
  ACTIONS_CORS_HEADERS,
  createPostResponse,
} from "@solana/actions";
import { transferSPL } from "./spl-transfer";
import { PYUSD_TOKEN_ADDRESS } from "./constants";

const headers = createActionHeaders();

export const GET = async (req: Request) => {
  return Response.json({ message: "Method not supported" } as ActionError, {
    status: 403,
    headers,
  });
};

export const OPTIONS = async () => Response.json(null, { headers });

export const POST = async (
  req: Request,
  { params }: { params: { amount: number } }
) => {
  const body: NextActionPostRequest = await req.json();
  console.log(body);

  const amount = params.amount;

  const transaction = await transferSPL({
    senderAddress: body.account,
    recipientAddress: "9QZqqJfKRuoGKTaCgUvjQMMUNpaxhPC3fvn2y8iPZ4uU",
    amount: amount,
    tokenAddress: PYUSD_TOKEN_ADDRESS,
  });

  const payload: ActionPostResponse = await createPostResponse({
    fields: {
      transaction,
      message: `Tipped ${amount} PYUSD, thanks for your support!`,
    },
  });
  return Response.json(payload, {
    headers: ACTIONS_CORS_HEADERS,
  });
};
