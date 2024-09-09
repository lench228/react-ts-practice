import { iProduct } from "@/lib/mock/mock-productts";
import { getProducts } from "@/lib/products-data";
import Card from "./card";

export default async function Cards() {
  const products = await getProducts();

  return (
    <div className="">
      <h1 className="text-3xl  font-semibold mt-24">Каталог товаров</h1>
      <ul className="mt-8 grid gap-8 grid-cols-4">
        {products.map((product) => (
          <li key={product.id}>
            <Card {...product} />
          </li>
        ))}
      </ul>
    </div>
  );
}
