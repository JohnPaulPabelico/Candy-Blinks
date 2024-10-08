"use client";

import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/store/store";
import { IAssetsSchema } from "@/lib/schemas/create-candy_machine_v2.schema";
import UploadImages from "./upload-images";
import UploadMetadatas from "./upload-metadata";

export default function Assets() {
  const form = useFormContext<IAssetsSchema>();
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
      <div className="font-semibold dm-sans leading-7 text-3xl text-white w-96">
        Assets
        <div className="mt-8 flex gap-5 flex-col">
          <UploadImages />
          <UploadMetadatas />
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
