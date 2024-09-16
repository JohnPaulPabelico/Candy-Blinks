import {
  createActionHeaders,
  NextActionPostRequest,
  ActionError,
  ACTIONS_CORS_HEADERS,
  Action,
} from "@solana/actions";

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

  const signature = body.signature;
  try {
    if (!signature) throw "Invalid signature";
  } catch (err) {
    throw 'Invalid "signature" provided';
  }

  const payload: Action = {
    type: "action" as const,
    title: "Successfully Minted",
    label: "Tip 1 PYUSD",
    icon: new URL("/CandyBlinks.png", new URL(req.url).origin).toString(),
    description:
      `Would you like to show appreciation for the artist's work? Consider leaving a tip to support their creative efforts and help them continue producing amazing art!` +
      `\n\n ${signature}`,

    links: {
      actions: [
        {
          label: "Tip 1 PYUSD",
          href: `/blinks/mint/${handle}/tip/tx`,
        },
      ],
    },
  };

  return Response.json(payload, {
    headers: ACTIONS_CORS_HEADERS,
  });
};