import Image from "next/image"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/presentation/components/ui/table"
import { Badge } from "@/presentation/components/ui/badge"
import { Button } from "@/presentation/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/presentation/components/ui/dropdown-menu"
import type { Product } from "@/shared/types/product"

interface ProductTableProps {
  products: Product[]
}

export function ProductTable({ products }: ProductTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Image</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Discount</TableHead>
          <TableHead>Stock Quantity</TableHead>
          <TableHead>Stock Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell>
              <div className="relative w-10 h-10">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-md"
                />
              </div>
            </TableCell>
            <TableCell>{product.name}</TableCell>
            <TableCell>
              <Badge variant="outline">{product.category}</Badge>
            </TableCell>
            <TableCell>
              {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(product.price)}
            </TableCell>
            <TableCell>{product.discount}%</TableCell>
            <TableCell>{product.stockQuantity}</TableCell>
            <TableCell>
              <Badge
                variant={
                  product.stockStatus === "In Stock"
                    ? "default"
                    : product.stockStatus === "Low Stock"
                      ? "secondary"
                      : "destructive"
                }
              >
                {product.stockStatus}
              </Badge>
            </TableCell>
            <TableCell>
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
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

