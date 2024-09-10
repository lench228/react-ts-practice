import Cards from "@/components/cards";
import Footer from "@/components/footer";
import HeroKits from "@/components/hero-kits";
import HeroPromo from "@/components/hero-promo";
import Image from "next/image";

export default function Home() {
  return (
    <main className="m-16 mb-0 flex-grow-1">
      <HeroPromo />
      <HeroKits />
      <Cards />
    </main>
  );
}
