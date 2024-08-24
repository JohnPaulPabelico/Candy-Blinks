import {
  ACTIONS_CORS_HEADERS,
  ActionGetResponse,
  ActionPostRequest,
  ActionPostResponse,
  createPostResponse,
} from "@solana/actions";
import { mintTransaction, getBlink } from "./utils";

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

    const payload: ActionGetResponse = {
      title: firstBlink.title,
      icon: firstBlink.image_url,
      description: firstBlink.description,
      label: firstBlink.label,
    };

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

  try {
    const transaction = await mintTransaction({
      toAddress: userPubKey,
      handle,
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
  } catch (error) {
    console.error("Failed to mint: ", error);
    throw error;
  }
};
