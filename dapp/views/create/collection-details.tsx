"use client";

import { IoMdCloudUpload } from "react-icons/io";
import { FaTrashAlt } from "react-icons/fa";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Dropzone from "react-dropzone";
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/store/store";
import { ICollectionDetailsSchema } from "@/lib/schemas/create-candy_machine_v2.schema";
import React, { useCallback, useState } from "react";

export default function CollectionDetails() {
  const form = useFormContext<ICollectionDetailsSchema>();
  const page = useStore((state) => state.page);
  const setPage = useStore((state) => state.setPage);

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

  const onDrop = useCallback((acceptedFiles: any) => {
    form.setValue("collectionImage", acceptedFiles[0]);
  }, []);

  const handleRemoveFile = () => {
    form.setValue("collectionImage", null);
  };

  return (
    <>
      <div className="font-semibold dm-sans leading-7 text-3xl text-white">
        Collection
        <div className="mt-8 flex gap-5 w-96">
          <Dropzone
            onDrop={onDrop}
            accept={{
              "image/jpeg": [],
              "image/png": [],
              "image/gif": [],
              "image/svg+xml": [],
            }}
          >
            {({ getRootProps, getInputProps }) => (
              <section>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />

                  {form.watch("collectionImage") ? (
                    <div
                      onClick={handleRemoveFile}
                      className="border-neutral-900 border bg-neutral-900 hover:bg-neutral-700 transition-all cursor-pointer text-red-500 rounded-lg p-8 relative"
                    >
                      <FaTrashAlt />
                    </div>
                  ) : (
                    <div className="border-neutral-900 border bg-neutral-900 hover:bg-neutral-700 transition-all cursor-pointer text-neutral-200 rounded-lg p-8 relative">
                      <IoMdCloudUpload />
                    </div>
                  )}
                </div>
              </section>
            )}
          </Dropzone>

          <div>
            <div className="text-base dm-sans font-normal">
              Collection Image
            </div>
            <div className="text-sm dm-sans font-normal text-neutral-400">
              Supported file types are JPG, PNG, GIF, and SVG.
            </div>
            {form.watch("collectionImage") && (
              <div className="mt-5 text-sm dm-sans font-normal text-white">
                Uploaded file: {form.watch("collectionImage")?.name}
              </div>
            )}
          </div>
        </div>
        <div className="mt-5">
          <FormField
            control={form.control}
            name="collectionName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Collection Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter Collection Name"
                    className="bg-neutral-900 text-white border-neutral-900 w-96 h-12"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="mt-5">
          <FormField
            control={form.control}
            name="collectionDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Collection Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us a little bit about your NFT collection"
                    className="bg-neutral-900 text-white border-neutral-900 w-96 h-36 resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
