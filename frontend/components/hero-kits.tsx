import HeroKit from "./hero-kit";

const kits = [
  {
    src: "/home/Rectangle 184.jpg",
    description: "Спальня",
  },
  {
    src: "/home/Rectangle 187.jpg",
    description: "Ванная",
  },
  {
    src: "/home/Rectangle 188.jpg",
    description: "Кухня",
  },
];

function HeroKits() {
  return (
    <div className="mt-24">
      <h2 className="font-semibold text-3xl text-center mb-3">
        Наборы по комнатам
      </h2>
      <ul className="flex flex-row gap-8">
        {kits.map((kit) => (
          <li key={kit.description} className="w-4/5 h-auto">
            <HeroKit {...kit} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HeroKits;
