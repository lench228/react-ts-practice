import "server-only";
import {API} from "@/lib/const";

export async function getProducts() {
    const res = await fetch(`${API}/products`);

    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }
    const data = await res.json();

    console.log(data);

    return data;
}
