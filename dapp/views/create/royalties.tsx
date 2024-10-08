"use client";
import { useFormContext, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/store/store";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FaPlusCircle } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { IRoyaltiesSchema } from "@/lib/schemas/create-candy_machine_v2.schema";
import { useEffect } from "react";

export default function Royalties() {
  const {
    control,
    trigger,
    getValues,
    formState: { errors },
  } = useFormContext<{ royalties: IRoyaltiesSchema }>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "royalties",
    rules: { minLength: 1, maxLength: 5 },
  });

  const page = useStore((state: { page: number }) => state.page);
  const setPage = useStore(
    (state: { setPage: (page: number) => void }) => state.setPage
  );

  useEffect(() => {
    if (fields.length === 0) {
      append({ walletAddress: "", royaltyPercentage: 0 });
    }
  }, [fields.length, append]);

  const prev = () => setPage(Math.max(0, page - 1));

  const next = async () => {
    const stepValid = await trigger("royalties");
    if (stepValid) {
      setPage(page + 1);
    } else {
      console.log("Form State:", getValues());
      console.log("Form Errors:", errors);
    }
  };

  const addRoyaltyEntry = () => {
    if (fields.length < 5) {
      append({ walletAddress: "", royaltyPercentage: 0 });
    }
  };

  return (
    <>
      <div className="font-semibold dm-sans leading-7 text-3xl text-white">
        Royalties
        {fields.map((field, index) => (
          <div key={field.id} className="mt-5 flex gap-5 items-end">
            <FormField
              control={control}
              name={`royalties.${index}.walletAddress`}
              render={({ field }) => (
                <FormItem className="flex-grow">
                  <FormLabel>Wallet Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Wallet Address"
                      className="bg-neutral-900 text-white border-neutral-900 h-12"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={`royalties.${index}.royaltyPercentage`}
              render={({ field }) => (
                <FormItem className="w-1/4">
                  <FormLabel>Percentage</FormLabel>
                  <FormControl>
                    <div className="flex">
                      <Input
                        placeholder="Enter percentage"
                        type="number"
                        {...field}
                        className="bg-neutral-900 text-white border-neutral-900 h-12 no-spinners"
                      />
                      {index > 0 && (
                        <div
                          onClick={() => remove(index)}
                          className="text-red-500 hover:text-red-600 h-12 w-12 p-2 cursor-pointer ml-2"
                        >
                          <FaTrashAlt />
                        </div>
                      )}
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        ))}
        {fields.length < 5 && (
          <div>
            <div
              onClick={addRoyaltyEntry}
              className="flex items-center gap-3 mt-5 hover:text-green-600 text-white cursor-pointer text-base w-fit hoverLte"
            >
              <FaPlusCircle />
              <div>Add Royalty Entry</div>
            </div>
          </div>
        )}
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
