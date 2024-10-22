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

interface IFormStepsProps {
  page: number;
}
export default function FormSteps({ page }: IFormStepsProps) {
  return (
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
  );
}
