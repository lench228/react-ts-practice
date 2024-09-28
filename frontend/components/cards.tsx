import {iProduct} from "@/lib/definitions/definitions";
import {getProducts} from "@/lib/products-data";
import Card from "./card";
import Filter from "./filter";
import Sort from "./sort";

interface iCards {
    totalCards: number;
    page?: number;
}

export default async function Cards({totalCards, page}: iCards) {
    const products = await getProducts();

    return (
        <div className="">
            <header className="flex justify-between">
                <h1 className="text-3xl  font-semibold">Каталог товаров</h1>
                <article className="flex">
                    <Filter></Filter>
                    <Sort></Sort>
                </article>
            </header>
            <ul className="mt-8 grid gap-8 grid-cols-4">
                {page
                    ? products
                        .slice(
                            page === 1 ? 0 : Math.pow(2, page),
                            page === 1 ? 4 : Math.pow(2, page) + 4
                        )
                        .map((product: iProduct) => (
                            <li key={product.id}>
                                <Card {...product} />
                            </li>
                        ))
                    : products.slice(0, totalCards).map((product: iProduct) => (
                        <li key={product.id}>
                            <Card {...product} />
                        </li>
                    ))}
            </ul>
        </div>
    );
}
