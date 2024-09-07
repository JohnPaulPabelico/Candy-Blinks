"use client";
import NavBar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import useCreateCandyMachine from "@/hooks/useCreateCandyMachine";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import React, { useEffect } from "react";
import {
  CreateCandyMachineSchema,
  CreateCandyMachineSchemaDefaults,
  ICreateCandyMachineSchema,
} from "@/lib/schemas/create-candy_machine.schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export default function Home() {
  const { mutate, error, data } = useCreateCandyMachine();
  const form = useForm<ICreateCandyMachineSchema>({
    resolver: zodResolver(CreateCandyMachineSchema),
    defaultValues: CreateCandyMachineSchemaDefaults,
  });

  function onSubmit(values: ICreateCandyMachineSchema) {
    mutate({
      collectionName: values.collectionName,
      itemsAvailable: values.numberOfItems,
    });
  }

  useEffect(() => {
    console.log(error);
  }, [error]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <>
      <NavBar />

      <div className="min-h-dvh flex flex-col gap-5 justify-center items-center bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-pink-950 from-10%   to-neutral-950">
        <div>Create Candy Machine</div>
        <Form {...form}>
          <FormField
            control={form.control}
            name="collectionName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Collection Name</FormLabel>
                <FormControl>
                  <Input placeholder="enter name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="numberOfItems"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of Items</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" type="number" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            onClick={form.handleSubmit(onSubmit)}
            className="mt-5 text-xl bg-red-400 hover:bg-red-500 text-white dm-sans font-bold py-2 px-4 rounded transition duration-200 hover:shadow-lg cursor-pointer"
          >
            Create Candy Machine
          </Button>
        </Form>
      </div>
    </>
  );
}
