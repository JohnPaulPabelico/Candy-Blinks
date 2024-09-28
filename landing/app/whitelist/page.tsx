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
import { useEffect } from "react";
import Image from "next/image";

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
    <section className="relative min-h-screen flex flex-col gap-5 justify-center items-center overflow-hidden">
      {/* Background GIF */}
      <Image
        src="/Candy-BG.webp" // Replace with your GIF file path
        alt="Background"
        layout="fill"
        objectFit="cover"
        quality={100}
        priority
      />

      {/* Overlay to ensure text readability */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-pink-950 from-10% to-neutral-950 opacity-90"></div>

      {/* Content */}
      <div className="container flex justify-center items-center flex-col relative z-10">
        <div className="w-[250px] h-[180px] overflow-hidden">
          <Image
            src="/logo.png"
            alt="logo"
            width={250}
            height={250}
            className="object-cover object-center"
          />
        </div>
        <div className="text-5xl dm-sans font-semibold text-red-400">
          Candy Blinks
        </div>
        <Form {...form}>
          <div className="mt-8 text-white">
            <FormField
              control={form.control}
              name="walletAddress"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Enter Wallet Address"
                      {...field}
                      className="bg-neutral-900 text-white border-neutral-900 h-12 focus-visible:ring-neutral-700 w-80"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            onClick={form.handleSubmit(onSubmit)}
            className="mt-10 text-xl bg-red-400 hover:bg-red-500 text-white dm-sans font-bold py-2 px-4 rounded transition duration-200 hover:shadow-lg cursor-pointer"
          >
            Join waitlist
          </Button>
        </Form>
      </div>
    </section>
  );
}
