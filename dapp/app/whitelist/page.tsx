"use client";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  IWhitelistSchema,
  WhitelistSchema,
  WhitelistSchemaDefaults,
} from "@/lib/schemas/whitelist.schema";
import useJoinWaitlist from "@/hooks/useJoinWaitlist";
import { getRandomValues } from "crypto";
import { useEffect } from "react";

export default function Whitelist() {
  const { mutate, isSuccess, isPending, error } = useJoinWaitlist();
  const form = useForm<IWhitelistSchema>({
    resolver: zodResolver(WhitelistSchema),
    defaultValues: WhitelistSchemaDefaults,
  });

  useEffect(() => {
    console.log(error);
  }, [error]);

  function onSubmit(values: IWhitelistSchema) {
    mutate({ ...values });
  }

  return (
    <section className="min-h-dvh flex flex-col gap-5 justify-center items-center bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-pink-950 from-10%   to-neutral-950">
      <div className="container flex justify-center items-center flex-col">
        <div className=" text-3xl dm-sans font-semibold text-white">
          Whitelist Form
        </div>
        <Form {...form}>
          <div className="mt-8">
            <FormField
              control={form.control}
              name="walletAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Wallet Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Wallet Address"
                      {...field}
                      className="bg-white text-black w-80 "
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            onClick={form.handleSubmit(onSubmit)}
            className="mt-5 text-xl bg-red-400 hover:bg-red-500 text-white dm-sans font-bold py-2 px-4 rounded transition duration-200 hover:shadow-lg cursor-pointer"
          >
            Submit
          </Button>
        </Form>
      </div>
    </section>
  );
}
