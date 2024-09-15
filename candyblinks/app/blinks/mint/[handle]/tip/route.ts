import {
  createActionHeaders,
  NextActionPostRequest,
  ActionError,
  CompletedAction,
  ActionPostRequest,
  ActionPostResponse,
  ACTIONS_CORS_HEADERS,
  createPostResponse,
} from "@solana/actions";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import { transferSolTransaction } from "./spl-transfer";

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
  { params }: { params: { handle: string } }
) => {
  const body: NextActionPostRequest = await req.json();
  console.log(body);

  const handle = params.handle;

  const transaction = await transferSolTransaction({
    from: body.account,
    amount: 0.1,
  });

  const payload: ActionPostResponse = await createPostResponse({
    fields: {
      transaction,
      message: `Tipped 0.1 SOL`,
    },
  });
  return Response.json(payload, {
    headers: ACTIONS_CORS_HEADERS,
  });
};
