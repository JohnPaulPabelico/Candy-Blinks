"use client";
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/store/store";
import {
  IAssetsSchema,
  ICollectionDetailsSchema,
  IRoyaltiesSchema,
  ISettingsSchema,
} from "@/lib/schemas/create-candy_machine_v2.schema";

type CombinedSchema = ICollectionDetailsSchema &
  IAssetsSchema &
  ISettingsSchema &
  IRoyaltiesSchema;

export default function Royalties() {
  const form = useFormContext<CombinedSchema>();
  const page = useStore((state: { page: number }) => state.page);
  const setPage = useStore(
    (state: { setPage: (page: number) => void }) => state.setPage
  );

  const prev = () => setPage(Math.max(0, page - 1));

  const next = async () => {
    const stepValid = await form.trigger();
    if (stepValid) {
      setPage(page + 1);
    } else {
      console.log("Form State:", form.getValues());
      console.log("Form Errors:", form.formState.errors);
    }
  };

  return (
    <>
      <div className="font-semibold dm-sans leading-7 text-3xl text-white">
        Deploy
        <div className="mt-8">
          <div className="text-lg dm-sans font-semibold ">Overview</div>
          <div className="mt-5">
            <div className="text-base dm-sans font-normal">
              Collection Name:&nbsp;{form.getValues("collectionName")}
            </div>
          </div>
          <div className="mt-2">
            <div className="text-base dm-sans font-normal">
              Collection Description:&nbsp;
              {form.getValues("collectionDescription")}
            </div>
          </div>
          <div className="mt-2">
            <div className="text-base dm-sans font-normal">
              Collection Image:&nbsp;
              {form.getValues("collectionImage")?.name || "Not uploaded"}
            </div>
          </div>
          <div className="mt-2">
            <div className="text-base dm-sans font-normal">
              Uploaded Images:&nbsp;
              {form.getValues("assetImages").length} images
            </div>
          </div>
          <div className="mt-2">
            <div className="text-base dm-sans font-normal">
              Uploaded Metadata:&nbsp;
              {form.getValues("assetsMetadata").length} files
            </div>
          </div>
          <div className="mt-2">
            <div className="text-base dm-sans font-normal">
              Price:&nbsp;
              {form.getValues("price")} SOL
            </div>
          </div>
          <div className="mt-2">
            <div className="text-base dm-sans font-normal">
              Wallet Address:&nbsp;
              {form.getValues("walletAddress")}
            </div>
          </div>
          <div className="mt-2">
            <div className="text-base dm-sans font-normal">
              Royalty Percentage:&nbsp;
              {form.getValues("royaltyPercentage")}%
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 pt-5 ml-auto">
        <div className="flex justify-between">
          <Button
            onClick={prev}
            className="mt-5 text-xl bg-red-400 hover:bg-red-500 text-white dm-sans font-bold py-2 px-4 rounded transition-colors duration-200 hover:shadow-lg cursor-pointer disabled:cursor-not-allowed disabled:opacity-0"
          >
            Back
          </Button>
          <Button
            onClick={next}
            className="mt-5 text-xl bg-red-400 hover:bg-red-500 text-white dm-sans font-bold py-2 px-4 rounded transition-colors duration-200 hover:shadow-lg cursor-pointer disabled:cursor-not-allowed disabled:opacity-0"
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
}
