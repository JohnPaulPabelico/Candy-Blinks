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

  const requestUrl = new URL(req.url);
  const baseHref = new URL(
    `/blinks/mint/${handle}/tip`,
    requestUrl.origin
  ).toString();

  const payload: Action = {
    type: "action" as const,
    title: "Successfully Minted",
    label: "Tip 1 PYUSD",
    icon: new URL("/CandyBlinks.png", new URL(req.url).origin).toString(),
    description: `Do you enjoy using our service? Consider leaving a tip to support our team and help us continue improving your experience!`,
    links: {
      actions: [
        {
          label: "Tip PYUSD",
          href: `${baseHref}/{amount}`,
          parameters: [
            {
              name: "amount",
              label: "Enter the amount of PYUSD to tip",
              required: true,
            },
          ],
        },
      ],
    },
  };

  return Response.json(payload, {
    headers: ACTIONS_CORS_HEADERS,
  });
};
