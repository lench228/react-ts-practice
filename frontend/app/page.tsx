import HeroKits from "@/components/hero-kits";
import HeroPromo from "@/components/hero-promo";
import Image from "next/image";

export default function Home() {
  return (
    <main className="m-16">
          <HeroPromo/>
          <HeroKits/>
    </main>
  );
}
