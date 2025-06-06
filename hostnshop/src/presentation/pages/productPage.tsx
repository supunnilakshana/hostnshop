"use client"

import { useState,useEffect } from "react"
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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/presentation/components/ui/form"
import { Input } from "@/presentation/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/presentation/components/ui/select"
import MainWrapper from "../components/mainWrapper"
import { ProductTable } from "@/presentation/components/products-datatable"
import type { Product } from "@/shared/types/product"
import { initialProducts } from "@/shared/data/productList"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  category: z.string({
    required_error: "Please select a category.",
  }),
  price: z.number().min(0, {
    message: "Price must be a positive number.",
  }),
  discount: z.number().min(0).max(100, {
    message: "Discount must be between 0 and 100.",
  }),
  stockQuantity: z.number().int().min(0, {
    message: "Stock quantity must be a positive integer.",
  }),
  stockStatus: z.enum(["In Stock", "Low Stock", "Out of Stock"], {
    required_error: "Please select a stock status.",
  }),
  image: z.string().url({
    message: "Please enter a valid URL for the image.",
  }),
})



const categories = ["Electronics", "Clothing", "Home", "Books", "Toys"]
const stockStatuses = ["In Stock", "Low Stock", "Out of Stock"]

export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const storedProducts = localStorage.getItem("products")
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts))
    } else {
      setProducts(initialProducts)
      localStorage.setItem("products", JSON.stringify(initialProducts))
    }
  }, [])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      category: "",
      price: 0,
      discount: 0,
      stockQuantity: 0,
      stockStatus: "In Stock",
      image: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    const newProduct: Product = {
      ...values,
      id: (products.length + 1).toString(),
    }
    const updatedProducts = [...products, newProduct]
    setProducts(updatedProducts)
    localStorage.setItem("products", JSON.stringify(updatedProducts))
    form.reset()
    setOpen(false)
  }

  return (
    <MainWrapper>
      <div className="container mx-auto p-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-[16px] font-bold leading-4">Products</h1>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-bg_primary text-accent text-[14px]">Add Product</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="text-[16px] text-center my-3">Add New Product</DialogTitle>
                <DialogDescription>
                  Fill in the details for the new product. Click save when you re done.
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
                          <Input placeholder="Product name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="0.00"
                            {...field}
                            onChange={(e) => field.onChange(+e.target.value)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="discount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Discount (%)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="0"
                            {...field}
                            onChange={(e) => field.onChange(+e.target.value)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="stockQuantity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Stock Quantity</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="0"
                            {...field}
                            onChange={(e) => field.onChange(+e.target.value)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="stockStatus"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Stock Status</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select stock status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {stockStatuses.map((status) => (
                              <SelectItem key={status} value={status}>
                                {status}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
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
                  <div className="flex w-full justify-right float-right ml-auto my-5">
                  <Button type="submit" className=" ml-auto bg-bg_primary text-accent text-[14px] ">Save Product</Button>
                  </div>

                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
        <ProductTable products={products} />
      </div>
    </MainWrapper>
  )
}

