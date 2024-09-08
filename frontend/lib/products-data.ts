import "server-only";
import { iProduct } from "./mock/mock-productts";

export async function getProducts() {
  const res = await fetch(
    "https://run.mocky.io/v3/9342276b-d6b9-4058-9732-d75469bad3bc"
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();

  // Превращаем объект в массив объектов
  const productsArray: iProduct[] = Object.values(data.products);

  console.log(productsArray); // Проверка структуры массива

  return productsArray;
}
