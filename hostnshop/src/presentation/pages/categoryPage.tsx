"use client"

import { useState, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/presentation/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/presentation/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/presentation/components/ui/form"
import { Input } from "@/presentation/components/ui/input"
import { Switch } from "@/presentation/components/ui/switch"
import { Textarea } from "@/presentation/components/ui/textarea"
import MainWrapper from "../components/mainWrapper"
import { CategoryTable } from "@/presentation/components/category-datatable"
import type { Category } from "@/shared/types/categories"
import { initialCategories } from "@/shared/data/categoryList"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  slug: z.string().min(2, {
    message: "Slug must be at least 2 characters.",
  }),
  description: z.string().max(500, {
    message: "Description must not exceed 500 characters.",
  }),
  image: z.string().url({
    message: "Please enter a valid URL for the image.",
  }),
  status: z.boolean(),
})

export default function CategoryPage() {
  const [categories, setCategories] = useState<Category[]>(initialCategories)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const storedCategories = localStorage.getItem("categories")
    if (storedCategories) {
      setCategories(JSON.parse(storedCategories))
    } else {
      setCategories(initialCategories)
      localStorage.setItem("categories", JSON.stringify(initialCategories))
    }
  }, [])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      slug: "",
      description: "",
      image: "",
      status: true,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    const newCategory: Category = {
      ...values,
      id: (categories.length + 1).toString(),
    }
    const updatedCategories = [...categories, newCategory]
    setCategories(updatedCategories)
    localStorage.setItem("categories", JSON.stringify(updatedCategories))
    form.reset()
    setOpen(false)
  }

  return (
    <MainWrapper>
      <div className="container mx-auto p-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-[16px] font-bold leading-4">Categories</h1>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-bg_primary text-accent text-[14px]">Add Category</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="text-[16px] text-center my-3">Add New Category</DialogTitle>
                <DialogDescription>
                  Fill in the details for the new category. Click save when you re done.
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Category name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="slug"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Slug</FormLabel>
                        <FormControl>
                          <Input placeholder="category-slug" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Category description" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Image URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://example.com/image.jpg" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Active</FormLabel>
                          <FormDescription>Set the category as active or inactive</FormDescription>
                        </div>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <div className="flex w-full justify-right float-right ml-auto my-5">
                    <Button type="submit" className="ml-auto bg-bg_primary text-accent text-[14px]">
                      Save Category
                    </Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
        <CategoryTable categories={categories} />
      </div>
    </MainWrapper>
  )
}

