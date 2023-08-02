import { db } from "@/lib/db";
import ProductCard from "./ProductCard";

interface ProductListProps {}

const ProductList = async () => {
  const products = await db.product.findMany();

  console.log("products", products);
  return (
    <div className="flex flex-col gap-4 md:grid md:grid-cols-12">
      {products.map((product) => (
        <ProductCard key={product.id} data={product} />
      ))}
    </div>
  );
};

export default ProductList;
