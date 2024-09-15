"use client";

import { z } from "zod";

const SOLANA_ADDRESS_REGEX = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;

export const WhitelistSchema = z.object({
  walletAddress: z
    .string()
    .min(32, "Invalid Solana wallet address")
    .max(44, "Invalid Solana wallet address")
    .regex(SOLANA_ADDRESS_REGEX, "Invalid Solana wallet address"),
});

export type IWhitelistSchema = z.infer<typeof WhitelistSchema>;

export const WhitelistSchemaDefaults: IWhitelistSchema = {
  walletAddress: "",
};
