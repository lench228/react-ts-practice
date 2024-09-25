import "server-only";
import { iProduct } from "../definitions/definitions";

export async function getProducts() {
  const res = await fetch("https://fakestoreasfpi.com/producs");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();

  console.log(data);

  return data;
}
