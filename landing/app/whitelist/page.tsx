"use client";

import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  IWhitelistSchema,
  WhitelistSchema,
  WhitelistSchemaDefaults,
} from "@/lib/schemas/whitelist.schema";
import useJoinWaitlist from "@/hooks/useJoinWaitlist";
import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { BsTwitterX } from "react-icons/bs";
import Link from "next/link";

const useBackgroundCarousel = (images: string[], interval: number) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    setDirection(1);
  }, [images.length]);

  useEffect(() => {
    const timer = setInterval(nextSlide, interval);
    return () => clearInterval(timer);
  }, [interval, nextSlide]);

  return { currentIndex, direction };
};

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

  const backgroundImages = [
    "/whitelist/1.gif",
    "/whitelist/2.webp",
    "/whitelist/3.gif",
    "/whitelist/4.gif",
    "/whitelist/5.gif",
    "/whitelist/6.gif",
    "/whitelist/7.gif",
    "/whitelist/8.gif",
    "/whitelist/9.gif",
  ];
  const { currentIndex } = useBackgroundCarousel(backgroundImages, 5000);

  return (
    <section className="relative min-h-screen flex flex-col gap-5 justify-center items-center overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        {backgroundImages.map((src, index) => (
          <div
            key={src}
            className="absolute inset-0 w-full h-full transition-transform duration-1000 ease-in-out"
            style={{
              transform: `translateX(${100 * (index - currentIndex)}%)`,
            }}
          >
            <Image
              src={src}
              alt={`Background ${index + 1}`}
              fill
              style={{ objectFit: "cover" }}
              quality={100}
              priority
              unoptimized
            />
          </div>
        ))}
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-pink-950 from-10% to-neutral-950 opacity-90"></div>

      <div className="mb-16 container flex justify-center items-center flex-col relative z-10">
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

      <div className="absolute bottom-10 flex justify-center items-center">
        <Link
          href="https://x.com/CandyBlinks_"
          target="_blank"
          className="text-white text-3xl hover:text-neutral-500 p-4 transition-all"
        >
          <BsTwitterX />
        </Link>
      </div>
    </section>
  );
}
