import Cards from "@/components/cards";
import Footer from "@/components/footer";
import HeroKits from "@/components/hero-kits";
import HeroPromo from "@/components/hero-promo";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="m-16 mb-0 flex-grow-1 items-center">
      <HeroPromo />
      <HeroKits />
      <Cards totalCards={8}/>
      <Link className="text-2xl flex justify-center my-2" href={"/catalog"}>
        Load more...
      </Link>
    </main>
  );
}
