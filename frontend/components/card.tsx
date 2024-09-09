import { iProduct } from "@/lib/mock/mock-productts";
import Image from "next/image";
import Price from "./ui/price";

function Card({
  id,
  type,
  name,
  isNew,
  src,
  cost,
  varinats,
  sale,
  choosen,
}: iProduct) {
  return (
    <div className="h-80 flex justify-start flex-col">
      <header
        className={`${
          isNew || sale ? "justify-between" : ""
        } flex flex-col h-80 gap-5 bg-[#66A892]`}
      >
        <Image
          className="self-end mt-3 mr-2"
          src={"/icons/favorite.svg"}
          alt={name}
          width={28}
          height={28}
        ></Image>
        <Image
          src={src}
          alt={name}
          width={190}
          height={200}
          fill={false}
          className={`self-center`}
        ></Image>
        {isNew && !sale && (
          <span className="py-1 px-2 w-14 bg-[#417060] text-white text-sm justify-self-end">
            New
          </span>
        )}
        {sale > 0 && (
          <span className="py-1 px-2 w-14 bg-[#CA2F2F] text-white text-sm justify-self-end">
            -{sale}%
          </span>
        )}
      </header>

      <footer>
        <header className="flex justify-between">
          <Price cost={cost} {...(sale !== 0 && { sale })} />
          <Image
            src={"/icons/Bag.svg"}
            width={24}
            height={24}
            alt="buy"
          ></Image>
        </header>
        <h2 className="text-sm leading-relaxed text-[#565656]">{name}</h2>
      </footer>
    </div>
  );
}

export default Card;
