import {
  ACTIONS_CORS_HEADERS,
  ActionGetResponse,
  ActionPostRequest,
  ActionPostResponse,
  createPostResponse,
  PostNextActionLink,
} from "@solana/actions";
import { mintTransaction, getBlink } from "./utils";
import client from "@/app/lib/blinksightsClient";
import { transferSolTransaction } from "./tip/spl-transfer";

export const GET = async (
  req: Request,
  { params }: { params: { handle: string } }
) => {
  const handle = params.handle;

  try {
    console.log("fetching blink");
    console.log(getBlink);
    const blinksData = await getBlink(handle);

    if (blinksData.length === 0) {
      console.error("No blinks found for the given handle");
      throw new Error("No blinks found for the given handle");
    }

    const firstBlink = blinksData[0];

    const response = client.createActionGetResponseV1(req.url, {
      title: firstBlink.title,
      icon: firstBlink.image_url,
      description: firstBlink.description,
      label: firstBlink.label,
      links: {
        actions: [
          {
            label: firstBlink.label,
            href: "/blinks/mint/" + handle,
          },
        ],
      },
    });

    if (!response) {
      throw new Error("Failed to create ActionGetResponse");
    }

    const payload: ActionGetResponse = response;

    return Response.json(payload, {
      headers: ACTIONS_CORS_HEADERS,
    });
  } catch (error) {
    console.error("Failed to get blink: ", error);
    throw error;
  }
};

export const OPTIONS = GET;

export const POST = async (
  req: Request,
  { params }: { params: { handle: string } }
) => {
  const handle = params.handle;
  const body: ActionPostRequest = await req.json();
  const userPubKey = body.account;

  console.log("body: ", body);

  client.trackActionV2(userPubKey, req.url);

  const blinksightsActionIdentityInstruction =
    await client.getActionIdentityInstructionV2(userPubKey, req.url);

  if (!blinksightsActionIdentityInstruction) {
    throw new Error("Failed to get the action identity instruction");
  }

  try {
    const transaction = await mintTransaction({
      toAddress: userPubKey,
      handle,
      blinksightsIx: blinksightsActionIdentityInstruction,
    });

    const nextAction = {
      type: "action" as const,
      title: "Successfully Minted",
      label: "Tip 1 SOL",
      icon: new URL("/CandyBlinks.png", new URL(req.url).origin).toString(),
      description:
        "Would you like to show appreciation for the artist's work? Consider leaving a tip to support their creative efforts and help them continue producing amazing art!",
      links: {
        actions: [
          {
            label: "Tip 0.1 SOL",
            href: `/blinks/mint/${handle}/tip`, // Example of the next step link
          },
        ],
      },
    };

    const txHash = transaction.signatures[0];
    console.log("txHash: ", txHash);

    const payload: ActionPostResponse = await createPostResponse({
      fields: {
        transaction,
        message: `Successfully minted!`,
        links: {
          next: {
            type: "inline",
            action: nextAction,
          },
        },
      },
    });
    return Response.json(payload, {
      headers: ACTIONS_CORS_HEADERS,
    });
  } catch (error) {
    console.error("Failed to mint: ", error);
    throw error;
  }
};
