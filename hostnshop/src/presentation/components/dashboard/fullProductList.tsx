import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "../ui/card"
  import ProductList from "./productList"

export function FullProductList(){
    return(
        <div className="container mx-auto px-4 md:px-6 h-auto">
        <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="text-semibold text-lg">Product List</CardTitle>
        </CardHeader>
        <CardContent>
            <ProductList/>
        </CardContent>
      </Card>

        </div>
    )
}