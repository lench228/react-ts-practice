import Cards from "@/components/cards";
import Filter from "@/components/filter";
import Sort from "@/components/sort";
import Image from "next/image";

export default function CatalogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="m-16 mt-0">
      <header className="flex justify-between">
      </header>
      {children}
    </main>
  );
}
