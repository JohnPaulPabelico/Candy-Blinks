"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import {
  CollectionSchema,
  CollectionSchemaDefaults,
  FormDataSchema,
  ICollectionSchema,
} from "@/lib/schemas/create-candy_machine.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { MdCollections } from "react-icons/md";
import { BsFillFileImageFill } from "react-icons/bs";
import { IoMdSettings } from "react-icons/io";
import { FaMoneyBill } from "react-icons/fa6";
import { IoRocketSharp } from "react-icons/io5";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

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

export default function FormComponent() {
  const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const form = useForm<ICollectionSchema>({
    resolver: zodResolver(CollectionSchema),
    defaultValues: CollectionSchemaDefaults,
  });

  const prev = () => setCurrentStep((step) => Math.max(0, step - 1));
  const next = async () => {
    // Get the fields for the current step
    const currentStepFields = getFieldsForStep(currentStep);

    // Trigger validation only for the current step's fields
    const stepValid = await form.trigger(currentStepFields);

    if (stepValid) {
      setCurrentStep((step) => Math.min(steps.length - 1, step + 1));
    } else {
      // Log the form state for debugging
      console.log("Form State:", form.getValues());
      console.log("Form Errors:", form.formState.errors);
    }
  };

  // Helper function to get fields for each step
  const getFieldsForStep = (step: number): (keyof ICollectionSchema)[] => {
    switch (step) {
      case 0:
        return ["collectionName", "collectionDescription"];

      default:
        return [];
    }
  };

  return (
    <div className="flex">
      {/* Steps */}
      <div>
        <ol>
          {steps.map((step, index) => (
            <li key={step.id} className="md:flex-1 max-w-xs">
              {currentStep > index ? (
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
              ) : currentStep === index ? (
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
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => console.log(data))}
          className="mt-8 ml-20"
        >
          {currentStep === 0 && (
            <div className="font-semibold dm-sans leading-7 text-3xl text-white">
              Collection
              <FormField
                control={form.control}
                name="collectionName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Collection Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Collection Name"
                        className="bg-white text-black w-80"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="collectionDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Collection Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us a little bit about your NFT collection"
                        className="bg-white text-black w-80 h-36 resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          {currentStep === 1 && (
            <div className="font-semibold dm-sans leading-7 text-3xl text-white">
              Assets
            </div>
          )}

          {currentStep === 2 && (
            <div className="font-semibold dm-sans leading-7 text-3xl text-white">
              Settings
            </div>
          )}
          {currentStep === 3 && (
            <div className="font-semibold dm-sans leading-7 text-3xl text-white">
              Royalties
            </div>
          )}
          {currentStep === 4 && (
            <div className="font-semibold dm-sans leading-7 text-3xl text-white">
              Deploy
            </div>
          )}

          {/* Navigation */}
          <div className="mt-8 pt-5 ml-auto">
            <div className="flex justify-between">
              <button
                type="button"
                onClick={prev}
                disabled={currentStep === 0}
                className="mt-5 text-xl bg-red-400 hover:bg-red-500 text-white dm-sans font-bold py-2 px-4 rounded transition duration-200 hover:shadow-lg cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
              >
                Back
              </button>
              <button
                type="button"
                onClick={next}
                disabled={currentStep === steps.length - 1}
                className="mt-5 text-xl bg-red-400 hover:bg-red-500 text-white dm-sans font-bold py-2 px-4 rounded transition duration-200 hover:shadow-lg cursor-pointer"
              >
                Next
              </button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
