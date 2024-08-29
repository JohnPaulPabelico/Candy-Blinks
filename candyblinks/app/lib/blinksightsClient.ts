import { BlinksightsClient } from "blinksights-sdk";

const client = new BlinksightsClient(process.env.BLINKSIGHTS_API_KEY!);

export default client;
