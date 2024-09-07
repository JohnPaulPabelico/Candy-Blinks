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
