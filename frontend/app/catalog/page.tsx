import Cards from "@/components/cards";
import Pagination from "@/components/pagintaion";
import { getProducts } from "@/lib/products-data";
import { Suspense } from "react";

async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const products = await getProducts();

  const page = Number(searchParams?.page) || 1;
  return (
    <Suspense
      fallback={<p className="text-6xl flex justify-center">Загрузка</p>}
    >
      <Cards totalCards={products.length} page={page}></Cards>
      <Pagination totalPages={products.length / 4 - 1}></Pagination>
    </Suspense>
  );
}

export default Page;
