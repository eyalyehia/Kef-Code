"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/table/registry/new-york/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/table/registry/new-york/ui/form"
import { Input } from "@/components/table/registry/new-york/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/table/registry/new-york/ui/select"
import { Textarea } from "@/components/table/registry/new-york/ui/textarea"
import { UploadDropzone } from "@/lib/uploadthing";
import { useState, useEffect } from 'react'
import "@uploadthing/react/styles.css";
import { toast } from "@/components/table/registry/new-york/ui/use-toast"

const profileFormSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    }),
  course: z
    .string({
      required_error: "Please select an email to display.",
    }),
  chapter: z
    .string({
      required_error: "Please select an email to display.",
    }),
  difficulty: z
    .string({
      required_error: "Please select an email to display.",
    }),
  url: z.string().max(160).min(4),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>


export function UploadProblem() {

  const [url, setUrl] = useState<string>("");
  const [inputValue, setInputValue] = useState(''); // Initial input value

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    mode: "onChange",
  })

  useEffect(() => {
    // Update the input value when the 'url' changes
    setInputValue(url);
  }, [url]);


  function onSubmit(data: ProfileFormValues) {
    console.log(data)
    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // })
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>שם השאלה</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="course"
            render={({ field }) => (
              <FormItem>
                <FormLabel>קורס</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="בחר קורס" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="algebra1">אלגברה לינארית 1</SelectItem>
                    <SelectItem value="infi1">אינפי 1</SelectItem>
                    <SelectItem value="intro">מבוא למדעי המחשב</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="chapter"
            render={({ field }) => (
              <FormItem>
                <FormLabel>פרק</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="difficulty"
            render={({ field }) => (
              <FormItem>
                <FormLabel>רמת קושי</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="קל">קל</SelectItem>
                    <SelectItem value="בינוני">בינוני</SelectItem>
                    <SelectItem value="קשה">קשה</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>קישור לשאלה</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder=""
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">העלאת שאלה</Button>
        </form>
      </Form>
      <div className="mb-6">
        <label htmlFor="url" className="form-label">
          קישור לשאלה
        </label>
        <input
          id="url"
          className="form-input"
          type="url"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>
      <UploadDropzone
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          if (res) {
            setUrl(res[0].fileUrl);
          }
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      /></>


  )
}