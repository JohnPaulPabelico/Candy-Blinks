"use client";
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/store/store";
import { ISettingsSchema } from "@/lib/schemas/create-candy_machine_v2.schema";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { useEffect, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { IoMdInformationCircleOutline } from "react-icons/io";

export default function Settings() {
  const form = useFormContext<ISettingsSchema>();
  const page = useStore((state: { page: number }) => state.page);
  const setPage = useStore(
    (state: { setPage: (page: number) => void }) => state.setPage
  );
  const isEndDateEnabled = form.watch("isEndDateEnabled");
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);

  useEffect(() => {
    const currentStartDate = form.getValues("start");
    if (currentStartDate) {
      setStartDate(currentStartDate);
    }
  }, [form]);

  const prev = () => setPage(Math.max(0, page - 1));

  const next = async () => {
    const stepValid = await form.trigger();
    if (stepValid) {
      setPage(page + 1);
    } else {
      console.log("Form State:", form.getValues());
      console.log("Form Errors:", form.formState.errors);
    }
  };

  return (
    <>
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
              </FormItem>
            )}
          />
          <div className="mt-5">
            <FormField
              control={form.control}
              name="start"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Start Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "bg-neutral-900 text-white border-neutral-900 w-96 h-12",
                            "hover:bg-neutral-800 hover:text-white hover:border-neutral-800",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto p-0 border-0 "
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(date) => {
                          field.onChange(date);
                          setStartDate(date);
                        }}
                        disabled={(date) =>
                          date < new Date(new Date().setHours(0, 0, 0, 0)) ||
                          date < new Date("1900-01-01")
                        }
                        initialFocus
                        className="bg-neutral-900 text-white "
                        classNames={{
                          day_selected:
                            "bg-neutral-700 text-white hover:bg-neutral-600 hover:text-white focus:bg-neutral-600 focus:text-white", // Custom selected day color
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="mt-5">
            <FormField
              control={form.control}
              name="end"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <div className="flex items-center justify-between">
                    <FormLabel>End Date</FormLabel>
                    <FormField
                      control={form.control}
                      name="isEndDateEnabled"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={(checked) => {
                                field.onChange(checked);
                                if (!checked) {
                                  form.setValue("end", undefined);
                                }
                              }}
                              className="bg-neutral-900 text-white border-neutral-900 mr-2"
                            />
                          </FormControl>
                          <FormLabel
                            className="leading-none mt-0"
                            style={{ marginTop: "0px" }}
                          >
                            Enabled
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                  </div>

                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "bg-neutral-900 text-white border-neutral-900 w-96 h-12",
                            "hover:bg-neutral-800 hover:text-white hover:border-neutral-800",
                            !field.value && "text-muted-foreground"
                          )}
                          disabled={!isEndDateEnabled}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto p-0 border-0 "
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          !startDate ||
                          date < startDate ||
                          date < new Date("1900-01-01")
                        }
                        initialFocus
                        className="bg-neutral-900 text-white "
                        classNames={{
                          day_selected:
                            "bg-neutral-700 text-white hover:bg-neutral-600 hover:text-white focus:bg-neutral-600 focus:text-white",
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="mt-5 w-96">
              <FormField
                control={form.control}
                name="isRevealLaterEnabled"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base flex items-center ">
                        Reveal Later
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <div className="text-neutral-400 ml-2 text-xl">
                                <IoMdInformationCircleOutline />
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="text-md">
                                Use temporary art for your NFT collection until
                                it is revealed later.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </FormLabel>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="bg-neutral-900 text-white border-neutral-900"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-5 ml-auto">
        <div className="flex justify-between">
          <Button
            onClick={prev}
            className="mt-5 text-xl bg-red-400 hover:bg-red-500 text-white dm-sans font-bold py-2 px-4 rounded transition-colors duration-200 hover:shadow-lg cursor-pointer disabled:cursor-not-allowed disabled:opacity-0"
          >
            Back
          </Button>
          <Button
            onClick={next}
            className="mt-5 text-xl bg-red-400 hover:bg-red-500 text-white dm-sans font-bold py-2 px-4 rounded transition-colors duration-200 hover:shadow-lg cursor-pointer disabled:cursor-not-allowed disabled:opacity-0"
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
}
