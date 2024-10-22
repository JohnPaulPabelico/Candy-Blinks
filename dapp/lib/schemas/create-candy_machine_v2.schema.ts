import { z } from "zod";
const MAX_UPLOAD_SIZE = 1024 * 1024 * 3; // 3MB
const ACCEPTED_FILE_TYPES = ["image/png", "image/jpg", "image/jpeg"];

export const CollectionDetailsSchema = z.object({
  collectionImage: z
    .instanceof(File || null)
    .nullable()
    .refine((file) => {
      return !file || file.size <= MAX_UPLOAD_SIZE;
    }, "File size must be less than 3MB")
    .refine((file) => {
      if (!file) {
        return false;
      }
      return ACCEPTED_FILE_TYPES.includes(file.type);
    }, "File must be a PNG"),

  collectionName: z.string().min(2),
  collectionDescription: z.string().min(2),
});

export type ICollectionDetailsSchema = z.infer<typeof CollectionDetailsSchema>;

export const CollectionDetailsSchemaDefaults: ICollectionDetailsSchema = {
  collectionName: "",
  collectionDescription: "",
  collectionImage: null,
};

export const AssetsSchema = z.object({
  assetImages: z.array(z.instanceof(File)).min(1),
  assetsMetadata: z.array(z.instanceof(File)).min(1),
});

export type IAssetsSchema = z.infer<typeof AssetsSchema>;

export const AssetsSchemaDefaults: IAssetsSchema = {
  assetImages: [],
  assetsMetadata: [],
};

export const SettingsSchema = z
  .object({
    price: z.coerce.number().min(0),
    start: z.date({
      required_error: "A start date is required.",
    }),
    isEndDateEnabled: z.boolean().default(false),
    end: z.date().optional(),
    isRevealLaterEnabled: z.boolean().default(false),
  })
  .refine(
    (data) => {
      if (data.isEndDateEnabled) {
        if (!data.end) {
          return false;
        }
        if (data.end <= data.start) {
          return false;
        }
      }
      return true;
    },
    {
      message: "An end date is required and must be later than the start date",
      path: ["end"],
    }
  );

export type ISettingsSchema = z.infer<typeof SettingsSchema>;

export const SettingsSchemaDefaults: ISettingsSchema = {
  price: 0,
  start: new Date(),
  isEndDateEnabled: false,
  end: new Date(new Date().setDate(new Date().getDate() + 1)),
  isRevealLaterEnabled: false,
};
const SOLANA_ADDRESS_REGEX = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;

const RoyaltyEntrySchema = z.object({
  walletAddress: z
    .string()
    .min(32, "Invalid Solana wallet address")
    .max(44, "Invalid Solana wallet address")
    .regex(SOLANA_ADDRESS_REGEX, "Invalid Solana wallet address"),
  royaltyPercentage: z.coerce.number().positive().max(100).min(5),
});

export const RoyaltiesSchema = z.array(RoyaltyEntrySchema).min(1).max(5);

export type IRoyaltiesSchema = z.infer<typeof RoyaltiesSchema>;

export const RoyaltiesSchemaDefaults: z.infer<typeof RoyaltiesSchema> = [
  {
    walletAddress: "",
    royaltyPercentage: 5,
  },
];
