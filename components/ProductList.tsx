import { Product } from "@prisma/client";
import { FC } from "react";
import ProductCard from "./ProductCard";

interface ProductListProps {
  products: Product[];
}

const ProductList: FC<ProductListProps> = async ({ products }) => {
  return (
    <div className="flex flex-col gap-4 md:grid md:grid-cols-12">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
