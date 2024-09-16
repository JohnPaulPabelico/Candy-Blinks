"use client";
import React, { useState } from "react";
import Image from "next/image";
import { IoIosClose } from "react-icons/io";
import NavBar from "@/components/navbar";
import {
  BlinkSchema,
  BlinkSchemaDefaults,
  IBlinkSchema,
} from "@/lib/schemas/create-blink.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Dropzone from "react-dropzone";
import { IoMdCloudUpload } from "react-icons/io";
import { FaTrashAlt } from "react-icons/fa";

export default function Dashboard() {
  const [success, setSuccess] = useState(false);
  const [uploadedIcon, setUploadedIcon] = useState<File | null>(null);

  const form = useForm<IBlinkSchema>({
    resolver: zodResolver(BlinkSchema),
    defaultValues: BlinkSchemaDefaults,
  });

  const formValues = useWatch({ control: form.control });

  const handleRemoveIcon = () => {
    setUploadedIcon(null);
  };

  return (
    <div>
      <NavBar />
      <div className="min-h-dvh flex gap-5 justify-center items-center bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-pink-950 from-10%   to-neutral-950">
        <Form {...form}>
          <form className="w-full max-w-xl">
            <div className="text-5xl dm-sans font-semibold text-white">
              Enlist a <span className="text-red-400">Candy Blink</span>
            </div>
            <div className="mt-2 mb-10 text-md dm-sans text-neutral-300">
              Bring your Candy Blink to life with personalized details that make
              it uniquely yours. Just fill in the form below, and watch your
              Candy Blink sparkle!
            </div>

            <FormField
              control={form.control}
              name="candyMachineId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Candy Machine ID</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Candy Machine ID"
                      className="bg-neutral-900 text-white border-neutral-900 h-12 focus-visible:ring-neutral-700"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4 mt-5">
              <div>
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter Blink Title"
                          className="bg-neutral-900 text-white border-neutral-900 h-12 focus-visible:ring-neutral-700"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="label"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Label</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Action Label"
                        className="bg-neutral-900 text-white border-neutral-900 h-12 focus-visible:ring-neutral-700"
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
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter Description"
                        className="bg-neutral-900 text-white border-neutral-900 h-36 resize-none focus-visible:ring-neutral-700"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full flex justify-center">
              <div className="mt-5 text-xl bg-red-400 hover:bg-red-500 text-white dm-sans font-bold py-2 px-4 rounded transition duration-200 hover:shadow-lg cursor-pointer">
                Enlist
              </div>
            </div>
          </form>
        </Form>
        <div>
          <div className="p-5 bg-neutral-800 rounded-lg shadow-lg shadow-pink-900/50 max-w-[440px] border-pink-900 border-2 mt-1">
            <Dropzone
              onDrop={(acceptedFiles) => {
                if (acceptedFiles.length > 0) {
                  setUploadedIcon(acceptedFiles[0]);
                }
              }}
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

                    {uploadedIcon ? (
                      <div
                        onClick={handleRemoveIcon}
                        className="border-neutral-900 border bg-neutral-700 hover:bg-neutral-700 transition-all cursor-pointer text-red-500 rounded-lg relative group"
                      >
                        <Image
                          src={URL.createObjectURL(uploadedIcon)}
                          alt="logo"
                          width={400}
                          height={400}
                          className="rounded-md"
                        />
                        <div className="absolute inset-0 bg-neutral-950 opacity-0 group-hover:opacity-50 transition-opacity duration-300 rounded-md flex justify-center items-center"></div>
                        <div className="absolute inset-0 bg-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center items-center">
                          <FaTrashAlt className="text-red-500 text-8xl" />
                        </div>
                      </div>
                    ) : (
                      <div className="flex justify-center items-center">
                        <div className="flex flex-col justify-center items-center border-neutral-900 border bg-neutral-900 hover:bg-neutral-700 transition-all cursor-pointer text-white rounded-lg p-44 w-fit text-5xl">
                          <IoMdCloudUpload />
                          <div className="text-white text-sm">Upload</div>
                        </div>
                      </div>
                    )}
                  </div>
                </section>
              )}
            </Dropzone>
            <div className="mt-3">
              <div className="text-sm dm-sans text-neutral-400 flex items-center ">
                <Image
                  src={"/logo.png"}
                  alt="logo"
                  width={20}
                  height={20}
                  className="mr-2"
                />
                candyblinks.fun
              </div>
              <div className="mt-3 text-lg dm-sans text-white">
                <div className="mt-3 text-lg dm-sans text-white">
                  {formValues.title || "Title"}
                </div>
              </div>
              <div className="mt-1 text-sm dm-sans text-neutral-400 text-wrap w-full">
                {formValues.description ||
                  "Description - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}
              </div>
              <button className="mt-3 p-2 rounded-md bg-black hover:bg-neutral-950 transition duration-200 w-full text-white">
                <span className="text-white font-bold">
                  {formValues.label || "Label"}
                </span>
              </button>
            </div>
          </div>
        </div>{" "}
        {success && (
          <>
            <div className="fixed top-0 left-0 right-0 z-20 flex items-center justify-center transition-all fade-in pt-[76px] bg-black bg-opacity-60 min-h-dvh overflow-hidden">
              <div className="flex items-center justify-center ">
                <div className="p-5 bg-neutral-800 rounded-lg shadow-lg shadow-pink-900/50 max-w-[440px] border-pink-900 border-2 -translate-y-24">
                  <IoIosClose
                    className="text-4xl ml-auto cursor-pointer hover:text-neutral-300 translate-x-5 -translate-y-5 transition text-white"
                    onClick={() => {
                      setSuccess(false);
                    }}
                  />
                  <p className="text-white font-bold lg:text-5xl text-4xl -translate-y-8 text-center dm-sans mt-5">
                    Success!
                  </p>
                  <p className="dm-sans lg:text-2xl text-xl mt-3 pixelify -translate-y-8 text-center text-white font-semibold">
                    <span className="text-red-400">Candy Blink</span> Created
                  </p>
                  {/* <div
                      className="text-center text-xl bg-red-400 hover:bg-red-500 text-white dm-sans font-bold py-2 px-4 rounded transition duration-200 hover:shadow-lg cursor-pointer"
                      onClick={() => {
                        copyToClipboard(candyBlinkUrl);
                      }}
                    >
                      Click to Copy Blink
                    </div> */}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
