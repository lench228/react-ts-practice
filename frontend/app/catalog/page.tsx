import Cards from "@/components/cards";
import Pagination from "@/components/pagintaion";
import { getProducts } from "@/lib/products-data";

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
    <div>
      <Cards totalCards={products.length} page={page}></Cards>
      <Pagination totalPages={products.length / 4 - 1}></Pagination>
    </div>
  );
}

export default Page;
