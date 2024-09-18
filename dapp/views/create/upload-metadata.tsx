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
import React, { useCallback } from "react";

export default function UploadMetadatas() {
  const form = useFormContext<IAssetsSchema>();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      form.setValue("assetsMetadata", [...acceptedFiles]);
    },
    [form]
  );

  const handleRemoveFile = () => {
    form.setValue("assetsMetadata", []);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  return (
    <FormField
      control={form.control}
      name={"assetsMetadata"}
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
                  {form.watch("assetsMetadata") &&
                  form.watch("assetsMetadata").length > 0 ? (
                    <div
                      onClick={handleRemoveFile}
                      className="border-neutral-900 border bg-neutral-900 hover:bg-neutral-700 transition-all cursor-pointer text-red-500 rounded-lg p-8 relative"
                    >
                      <FaTrashAlt />
                    </div>
                  ) : (
                    <div
                      className={`border-neutral-900 border ${
                        isDragActive ? "bg-neutral-700" : "bg-neutral-900"
                      } hover:bg-neutral-700 transition-all cursor-pointer text-neutral-200 rounded-lg p-8 relative`}
                    >
                      <IoMdCloudUpload />
                    </div>
                  )}
                </div>

                <div>
                  <div className="text-base dm-sans font-normal">
                    Metadata Folder
                  </div>
                  <div className="text-sm dm-sans font-normal text-neutral-400">
                    Uploaded your metadata files in JSON format.
                  </div>
                  {form.watch("assetsMetadata") &&
                    form.watch("assetsMetadata").length > 0 && (
                      <div className="mt-2 text-sm dm-sans font-normal text-white">
                        Uploaded Metadata: {form.watch("assetsMetadata").length}
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
