import "server-only";
import { iProduct } from "./mock/mock-productts";

export async function getProducts() {
  const res = await fetch(
    "https://run.mocky.io/v3/0063e040-6115-4dc8-9e87-a76748b5b006"
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
