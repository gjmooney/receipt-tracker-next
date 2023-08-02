import { db } from "@/lib/db";
import ProductCard from "./ProductCard";

interface ProductListProps {}

const ProductList = async () => {
  const products = await db.product.findMany();

  console.log("products", products);
  return (
    <div className="grid grid-cols-12 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} data={product} />
      ))}
    </div>
  );
};

export default ProductList;
