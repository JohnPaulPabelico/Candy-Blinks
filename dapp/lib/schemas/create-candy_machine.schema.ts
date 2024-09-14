"use client";

import { z } from "zod";

export const CreateCandyMachineSchema = z.object({
  collectionName: z.string().min(2).max(50),
  numberOfItems: z.coerce.number().positive(),
});

export type ICreateCandyMachineSchema = z.infer<
  typeof CreateCandyMachineSchema
>;

export const CreateCandyMachineSchemaDefaults: ICreateCandyMachineSchema = {
  collectionName: "",
  numberOfItems: 0,
};

const SOLANA_ADDRESS_REGEX = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;

export const CollectionSchema = z.object({
  collectionName: z.string().min(2, "Collection name is required").max(50),
  collectionDescription: z
    .string()
    .min(2, "Collection description is required")
    .max(50, "Price is required"),
  price: z.coerce.number().positive(),
  walletAddress: z
    .string()
    .min(32, "Invalid Solana wallet address")
    .max(44, "Invalid Solana wallet address")
    .regex(SOLANA_ADDRESS_REGEX, "Invalid Solana wallet address"),
  royaltyPercentage: z.coerce.number().positive().max(100),
});

export type ICollectionSchema = z.infer<typeof CollectionSchema>;

export const CollectionSchemaDefaults: ICollectionSchema = {
  collectionName: "",
  collectionDescription: "",
  price: 0,
  walletAddress: "",
  royaltyPercentage: 0,
};
