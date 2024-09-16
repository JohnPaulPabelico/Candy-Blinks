"use client";

import { z } from "zod";

const CANDY_MACHINE_ID_REGEX = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;

export const BlinkSchema = z.object({
  candyMachineId: z
    .string()
    .min(32, "Invalid candy machine id")
    .max(44, "Invalid candy machine id")
    .regex(CANDY_MACHINE_ID_REGEX, "Invalid candy machine id"),
  title: z.string().min(2, "Title is required").max(50),
  label: z.string().min(2, "Label is required").max(50),
  iconUrl: z.string().min(2, "Icon url is required").max(50),
  description: z.string().min(2, "Description is required"),
});

export type IBlinkSchema = z.infer<typeof BlinkSchema>;

export const BlinkSchemaDefaults: IBlinkSchema = {
  candyMachineId: "",
  title: "",
  label: "",
  iconUrl: "",
  description: "",
};
