"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarIcon, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";
import { TimePicker } from "./time-picker";

const formSchema = z.object({
  startDate: z.date(),
  endDate: z.date(),
});
type FormSchemaType = z.infer<typeof formSchema>;

export default function DateTimePickerForm() {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: FormSchemaType) {
    const start = format(values.startDate, "yyyy-MM-dd HH:mm:ss");
    const end = format(values.endDate, "yyyy-MM-dd HH:mm:ss");
    console.log(start, end)
    // fetchRequestInd(start, end);
  }

  return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center justify-start gap-4">
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem className="flex flex-col items-start">
                <FormLabel>Data inicial</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[280px] justify-start text-left font-normal",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value ? (
                        format(field.value, "PPP HH:mm:ss")
                      ) : (
                        <span>Selecione uma data e hora</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                    />
                    <div className="border-t border-border p-3">
                      <TimePicker setDate={field.onChange} date={field.value} />
                    </div>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem className="flex flex-col items-start">
                <FormLabel>Data final</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[280px] justify-start text-left font-normal",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value ? (
                        format(field.value, "PPP HH:mm:ss")
                      ) : (
                        <span>Selecione uma data e hora</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                    <div className="border-t border-border p-3">
                      <TimePicker setDate={field.onChange} date={field.value} />
                    </div>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="mt-5 hover:bg-red-900" type="submit"><Search/></Button>
        </form>
      </Form>
  );
}
