import Image from "next/image";
import Link from "next/link";

function NavIcons() {
  return (
    <ul className="flex gap-5">
      <li>
        <Link href={"profile/"}>
          <Image
            src={"/icons/user.svg"}
            width={24}
            height={24}
            alt="user"
          ></Image>
        </Link>
      </li>
      <li>
        <Image
          src={"/icons/favorite.svg"}
          width={24}
          height={24}
          alt="favorite"
        ></Image>
      </li>
      <li>
        <Image
          src={"/icons/purchases.svg"}
          width={24}
          height={24}
          alt="bin"
        ></Image>
      </li>
    </ul>
  );
}

export default NavIcons;
