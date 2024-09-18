import "server-only";
import { iProduct } from "../mock/mock-productts";

export async function getProducts() {
  const res = await fetch("https://fakestoreapi.com/products");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();

  console.log(data);

  return data;
}
