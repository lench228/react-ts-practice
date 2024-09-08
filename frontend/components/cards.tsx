import { iProduct } from "@/lib/mock/mock-productts";
import { getProducts } from "@/lib/products-data";

export default async function Cards() {
  // Загрузка данных на сервере
  const products = await getProducts();

  return (
    <div>
      <h1>Product List</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <h2>{product.name}</h2>
            <p>Price: {product.cost}</p>
            <p>Sale: {product.sale}%</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
