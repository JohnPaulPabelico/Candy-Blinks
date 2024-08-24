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
  { params, body }: { params: { handle: string }; body: ActionPostRequest }
) => {
  console.log("Handle: ", params.handle);
  console.log("Body: ", body);
  // let body: ActionPostRequest;
  try {
    // body = await req.json();
  } catch (error) {
    if (
      error instanceof SyntaxError &&
      error.message.includes("Unexpected end of JSON input")
    ) {
      console.error("Empty or invalid JSON in request body");
      return Response.json(
        { error: "Empty or invalid request body" },
        { status: 400 }
      );
    }
    throw error;
  }

  const userPubKey = body.account;
  const handle = params.handle;

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
