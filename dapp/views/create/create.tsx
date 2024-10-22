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
import FormSteps from "./form-steps";


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

function isCollectionPageDefaults(value: any): value is {
  collectionImage: File | null;
  collectionName: string;
  collectionDescription: string;
} {
  return (
    value &&
    "collectionImage" in value &&
    "collectionName" in value &&
    "collectionDescription" in value
  );
}

export default function CreateView() {
  const page = useStore((state) => state.page);
  const form = useForm({
    resolver: page < resolvers.length ? resolvers[page].schema : undefined,
    defaultValues:
      page < resolvers.length &&
      isCollectionPageDefaults(resolvers[page].defaults)
        ? resolvers[page].defaults
        : {},
  });

  // OLD ONE, HAVING ISSUES ON BUILD
  // const form = useForm({
  //   resolver: page < resolvers.length ? resolvers[page].schema : undefined,
  //   defaultValues: page < resolvers.length ? resolvers[page].defaults : {},
  // });

  return (
    <div className="flex">
      {/* Steps */}
      <FormSteps page={page} />
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
        </form>
      </FormProvider>
    </div>
  );
}
