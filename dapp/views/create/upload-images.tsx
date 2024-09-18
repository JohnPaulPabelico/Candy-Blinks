"use client";
import { IoMdCloudUpload } from "react-icons/io";
import { FaTrashAlt } from "react-icons/fa";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useDropzone } from "react-dropzone";
import { useFormContext } from "react-hook-form";
import { IAssetsSchema } from "@/lib/schemas/create-candy_machine_v2.schema";
import React, { useCallback, useEffect } from "react";
import useUploadImages from "@/hooks/useUploadImages";

export default function UploadImages() {
  const form = useFormContext<IAssetsSchema>();
  const { mutate, error, data } = useUploadImages();

  useEffect(() => {
    console.log(error);
  }, [error]);

  useEffect(() => {
    console.log(data);
  }, [data]);
  const onDrop = useCallback((acceptedFiles: File[]) => {
    mutate({ images: acceptedFiles });
    form.setValue("assetImages", [...acceptedFiles]);
  }, []);

  const handleRemoveFile = () => {
    form.setValue("assetImages", []);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
  });

  return (
    <FormField
      control={form.control}
      name={"assetImages"}
      render={({ field }) => {
        return (
          <FormItem>
            <FormControl>
              <div className="w-fit flex items-center gap-4">
                <div {...getRootProps()} className="flex items-center">
                  <Input
                    type="file"
                    placeholder="shadcn"
                    {...getInputProps()}
                    // @ts-ignore
                    webkitdirectory="true"
                    directory=""
                  />
                  {form.watch("assetImages") &&
                  form.watch("assetImages").length > 0 ? (
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

                <div>
                  <div className="text-base dm-sans font-normal">Images</div>
                  <div className="text-sm dm-sans font-normal text-neutral-400">
                    Supported file types are JPG, PNG, GIF, and SVG.
                  </div>
                  {form.watch("assetImages") &&
                    form.watch("assetImages").length > 0 && (
                      <div className="mt-5 text-sm dm-sans font-normal text-white">
                        Uploaded Images: {form.watch("assetImages").length}
                      </div>
                    )}
                </div>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
