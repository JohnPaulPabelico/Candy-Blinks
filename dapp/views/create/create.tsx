"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { MdCollections } from "react-icons/md";
import { BsFillFileImageFill } from "react-icons/bs";
import { IoMdSettings } from "react-icons/io";
import { FaMoneyBill } from "react-icons/fa6";
import { IoRocketSharp } from "react-icons/io5";
import { useStore } from "@/lib/store/store";
import {
  CollectionDetailsSchema,
  CollectionDetailsSchemaDefaults,
  AssetsSchema,
  AssetsSchemaDefaults,
  SettingsSchema,
  SettingsSchemaDefaults,
  RoyaltiesSchema,
  RoyaltiesSchemaDefaults,
} from "@/lib/schemas/create-candy_machine_v2.schema";
import Assets from "./assets";
import Settings from "./settings";
import CollectionDetails from "./collection-details";
import Royalties from "./royalties";
import Deploy from "./deploy";

const steps = [
  {
    id: "Collection Details",
    description:
      "Creating a collection ensures NFTs are easily searchable in wallets and marketplaces.",
    icon: <BsFillFileImageFill />,
  },
  {
    id: "Assets",
    description:
      "Upload and manage your assets for your collection. Prepare your images and metadata.",
    icon: <MdCollections />,
  },
  {
    id: "Settings",
    description:
      "Set the price, launch date, and other parameters you wish to customize for your collection.",
    icon: <IoMdSettings />,
  },
  {
    id: "Royalties",
    description:
      "Configure the royalties and set the percentage each wallet receives for your collection.",
    icon: <FaMoneyBill />,
  },
  {
    id: "Deploy",
    description:
      "Review and finalize the details, then confirm to deploy your candy machine and launch your NFT collection.",
    icon: <IoRocketSharp />,
  },
];
const resolvers = [
  {
    schema: zodResolver(CollectionDetailsSchema),
    defaults: CollectionDetailsSchemaDefaults,
  },
  {
    schema: zodResolver(AssetsSchema),
    defaults: AssetsSchemaDefaults,
  },
  {
    schema: zodResolver(SettingsSchema),
    defaults: SettingsSchemaDefaults,
  },
  {
    schema: zodResolver(RoyaltiesSchema),
    defaults: RoyaltiesSchemaDefaults,
  },
];

export default function CreateView() {
  const page = useStore((state: { page: number }) => state.page);
  const form = useForm({
    resolver: page < resolvers.length ? resolvers[page].schema : undefined,
    defaultValues: page < resolvers.length ? resolvers[page].defaults : {},
  });

  return (
    <div className="flex">
      {/* Steps */}
      <div>
        <ol>
          {steps.map((step, index) => (
            <li key={step.id} className="md:flex-1 max-w-xs">
              {page > index ? (
                <div className="flex mt-8">
                  <div className="text-xl dm-sans mr-3">
                    <span className="p-1 bg-red-400 transition-colors rounded-sm"></span>
                  </div>
                  <div>
                    <div className="text-xl dm-sans text-red-400 flex gap-3 items-center">
                      <div>{step.icon}</div>
                      <div>{step.id}</div>
                    </div>
                    <div className="mt-3 text-neutral-400 text-md">
                      {step.description}
                    </div>
                  </div>
                </div>
              ) : page === index ? (
                <div className="flex mt-8">
                  <div className="text-xl dm-sans mr-3">
                    <span className="p-1 bg-white transition-colors rounded-sm"></span>
                  </div>
                  <div>
                    <div className="text-xl dm-sans font-semibold flex gap-3 items-center transition-all ease-in-out">
                      <div>{step.icon}</div>
                      <div>{step.id}</div>
                    </div>
                    <div className="mt-3 text-neutral-400 text-md">
                      {step.description}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex mt-8">
                  <div className="text-xl dm-sans mr-3 p-1 invisible"></div>
                  <div>
                    <div className="text-xl dm-sans text-neutral-400 flex gap-3 items-center">
                      <div>{step.icon}</div>
                      <div>{step.id}</div>
                    </div>
                    <div className="mt-3 text-neutral-600 text-md transition-colors">
                      {step.description}
                    </div>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ol>
      </div>

      {/* Form */}
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit((data) => console.log(data))}
          className="mt-8 ml-20"
        >
          {page === 0 && <CollectionDetails />}
          {page === 1 && <Assets />}
          {page === 2 && <Settings />}
          {page === 3 && <Royalties />}
          {page === 4 && <Deploy />}
          {/* {page === 1 && (
            <div className="font-semibold dm-sans leading-7 text-3xl text-white w-96">
              Assets
              <div className="mt-8 flex gap-5">
                <Dropzone
                  onDrop={(acceptedFiles) => {
                    if (acceptedFiles.length > 0) {
                      setUploadedImages((prevFiles) => [
                        ...prevFiles,
                        ...acceptedFiles,
                      ]);
                    }
                  }}
                  accept={{
                    "image/jpeg": [],
                    "image/png": [],
                    "image/gif": [],
                    "image/svg+xml": [],
                  }}
                  multiple
                >
                  {({ getRootProps, getInputProps }) => (
                    <section>
                      <div {...getRootProps()}>
                        <input {...getInputProps()} />

                        {uploadedImages && uploadedImages.length > 0 ? (
                          <div
                            onClick={handleRemoveImages}
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
                  <div className="text-base dm-sans font-normal">Images</div>
                  <div className="text-sm dm-sans font-normal text-neutral-400">
                    Supported file types are JPG, PNG, GIF, and SVG.
                  </div>
                  {uploadedImages && uploadedImages.length > 0 && (
                    <div className="mt-5 text-sm dm-sans font-normal text-white">
                      Uploaded Images: {uploadedImages.length}
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-5 flex gap-5">
                <Dropzone
                  onDrop={(acceptedFiles) => {
                    if (acceptedFiles.length > 0) {
                      setUploadedMetadata((prevFiles) => [
                        ...prevFiles,
                        ...acceptedFiles,
                      ]);
                    }
                  }}
                  accept={{
                    "application/json": [],
                  }}
                  multiple
                >
                  {({ getRootProps, getInputProps }) => (
                    <section>
                      <div {...getRootProps()}>
                        <input {...getInputProps()} />

                        {uploadedMetadata && uploadedMetadata.length > 0 ? (
                          <div
                            onClick={handleRemoveMetadata}
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
                  <div className="text-base dm-sans font-normal">Metadata</div>
                  <div className="text-sm dm-sans font-normal text-neutral-400">
                    Uploaded your metadata files in JSON format.
                  </div>
                  {uploadedMetadata && uploadedMetadata.length > 0 && (
                    <div className="mt-5 text-sm dm-sans font-normal text-white">
                      Uploaded Metadata: {uploadedMetadata.length}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {page === 2 && (
            <div className="font-semibold dm-sans leading-7 text-3xl text-white">
              Settings
              <div className="mt-5">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price in SOL</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter price in SOL"
                          type="number"
                          {...field}
                          className="bg-neutral-900 text-white border-neutral-900 w-96 h-12 no-spinners"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          )}
          {page === 3 && (
            <div className="font-semibold dm-sans leading-7 text-3xl text-white">
              Royalties
              <div className="mt-5">
                <FormField
                  control={form.control}
                  name="walletAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Wallet Address</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter Wallet Address"
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
                  name="royaltyPercentage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Percentage</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter percentage"
                          type="number"
                          {...field}
                          className="bg-neutral-900 text-white border-neutral-900 w-96 h-12 no-spinners"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          )}
          {page === 4 && (
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
                    {uploadedFile ? uploadedFile.name : "Not uploaded"}
                  </div>
                </div>
                <div className="mt-2">
                  <div className="text-base dm-sans font-normal">
                    Uploaded Images:&nbsp;
                    {uploadedImages.length} images
                  </div>
                </div>
                <div className="mt-2">
                  <div className="text-base dm-sans font-normal">
                    Uploaded Metadata:&nbsp;
                    {uploadedMetadata.length} files
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
          )} */}

          {/* Navigation */}
        </form>
      </FormProvider>
    </div>
  );
}
