import "server-only";
import { iProduct } from "./mock/mock-productts";

export async function getProducts() {
  const res = await fetch(
    "https://run.mocky.io/v3/a96fa200-15b7-4dcf-a7f1-0bc3da8cb4a8"
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();

  const productsArray: iProduct[] = Object.values(data.products);

  console.log(productsArray);

  return productsArray;
}
