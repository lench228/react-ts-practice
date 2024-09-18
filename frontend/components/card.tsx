import { iProduct } from "@/lib/mock/mock-productts";
import Image from "next/image";
import Price from "./ui/price";

function Card({ ...props }: iProduct) {
  return (
    <div className="flex justify-between flex-col h-full">
      <header className={`flex flex-col h-full gap-5 bg-[#66A892]`}>
        <Image
          className="self-end mt-3 mr-2"
          src={"/icons/favorite.svg"}
          alt={props.title}
          width={28}
          height={28}
        ></Image>
        <Image
          src={props.image}
          alt={props.title}
          width={100}
          height={100}
          className={`self-center`}
        ></Image>
      </header>

      <footer>
        <header className="flex justify-between">
          <Price cost={props.price} />
          <Image
            src={"/icons/Bag.svg"}
            width={24}
            height={24}
            alt="buy"
          ></Image>
        </header>
        <h2 className="text-sm leading-relaxed text-[#565656]">
          {props.title.slice(0, 20)}...
        </h2>
      </footer>
    </div>
  );
}

export default Card;
