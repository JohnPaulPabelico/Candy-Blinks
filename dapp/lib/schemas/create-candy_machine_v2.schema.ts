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
  assetImages: z.array(z.instanceof(File)),
  assetsMetadata: z.array(z.instanceof(File)),
});

export type IAssetsSchema = z.infer<typeof AssetsSchema>;

export const AssetsSchemaDefaults: IAssetsSchema = {
  assetImages: [],
  assetsMetadata: [],
};
