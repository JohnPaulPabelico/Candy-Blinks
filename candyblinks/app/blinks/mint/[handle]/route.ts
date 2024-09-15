import {
  ACTIONS_CORS_HEADERS,
  ActionGetResponse,
  ActionPostRequest,
  ActionPostResponse,
  createPostResponse,
} from "@solana/actions";
import { mintTransaction, getBlink } from "./utils";
import client from "@/app/lib/blinksightsClient";

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

    const payload: ActionPostResponse = await createPostResponse({
      fields: {
        transaction,
        message: `Successfully minted!`,
        links: {
          /**
           * this `href` will receive a POST request (callback)
           * with the confirmed `signature`
           *
           * you could also use query params to track whatever step you are on
           */
          next: {
            type: "post",
            href: "/blinks/mint/" + handle + "/tip",
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
