"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, ArrowUpDown } from "lucide-react"
import Image from "next/image"

import { Button } from "@/presentation/components/ui/button"
import { Badge } from "@/presentation/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/presentation/components/ui/dropdown-menu"

export type ProductVariant = {
  color: string
  size: string
  material: string
}

export type Product = {
  id: string
  name: string
  category: string
  price: number
  discount: number
  stockQuantity: number
  stockStatus: "In Stock" | "Low Stock" | "Out of Stock"
  image: string
  variants: ProductVariant[]
}

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      const image = row.getValue("image") as string
      return (
        <div className="relative w-10 h-10">
          <Image
            src={image || "/placeholder.svg"}
            alt={row.getValue("name")}
            layout="fill"
            objectFit="cover"
            className="rounded-md"
          />
        </div>
      )
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Product Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      const category = row.getValue("category") as string
      return <Badge variant="outline">{category}</Badge>
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const price = Number.parseFloat(row.getValue("price"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price)
      return <div className="font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "discount",
    header: "Discount",
    cell: ({ row }) => {
      const discount = row.getValue("discount") as number
      return <div>{discount}%</div>
    },
  },
  {
    accessorKey: "stockQuantity",
    header: "Stock Quantity",
  },
  {
    accessorKey: "stockStatus",
    header: "Stock Status",
    cell: ({ row }) => {
      const status = row.getValue("stockStatus") as string
      return (
        <Badge variant={status === "In Stock" ? "default" : status === "Low Stock" ? "secondary" : "destructive"}>
          {status}
        </Badge>
      )
    },
  },
  {
    accessorKey: "variants",
    header: "Variants",
    cell: ({ row }) => {
      const variants = row.getValue("variants") as ProductVariant[]
      return (
        <div className="flex flex-wrap gap-1">
          {variants.map((variant, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {variant.color}, {variant.size}, {variant.material}
            </Badge>
          ))}
        </div>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const product = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(product.id)}>
              Copy product ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View details</DropdownMenuItem>
            <DropdownMenuItem>Edit product</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

