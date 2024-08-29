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

    // Access the first item in the array
    const firstBlink = blinksData[0];

    const payload: ActionGetResponse = client.createActionGetResponseV1(
      req.url,
      {
        title: firstBlink.title,
        icon: firstBlink.image_url,
        description: firstBlink.description,
        label: firstBlink.label,
      }
    );

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
  client.trackActionV2(userPubKey, req.url);
  const blinksightsActionIdentityInstruction =
    client.getActionIdentityInstructionV2(userPubKey, req.url);
    
  try {
    const transaction = await mintTransaction({
      toAddress: userPubKey,
      handle,
    });

    const payload: ActionPostResponse = await createPostResponse({
      fields: {
        transaction,
        message: `Successfully minted!`,
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
