import { iProduct } from "@/lib/mock/mock-productts";
import { getProducts } from "@/lib/products-data";
import Card from "./card";

export default async function Cards() {
  const products = await getProducts();
  const finalProducts = products.filter((product, index) => {
      index < 12 ? product : null
  })

  return (
    <div className="">
      <h1 className="text-3xl  font-semibold mt-24">Каталог товаров</h1>
      <ul className="mt-8 grid gap-8 grid-cols-4">
        {products.map((product, index) => (
          <li key={product.id}>
            <Card {...product} />
          </li>
        ))}
      </ul>
    </div>
  );
}
