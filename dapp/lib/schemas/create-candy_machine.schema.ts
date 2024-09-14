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

export const CollectionSchema = z.object({
  collectionName: z.string().min(2).max(50),
  collectionDescription: z.string().min(2).max(50),
});

export type ICollectionSchema = z.infer<typeof CollectionSchema>;

export const CollectionSchemaDefaults: ICollectionSchema = {
  collectionName: "",
  collectionDescription: "",
};
