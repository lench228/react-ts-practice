import Image from "next/image";

function NavIcons() {
    return (
     <ul className="flex gap-5">
        <li>
            <Image 
            src={'/icons/user.svg'}
            width={24}
            height={24}
            alt="user">
            </Image>
        </li>
        <li>
            <Image 
            src={'/icons/favorite.svg'}
            width={24}
            height={24}
            alt="favorite">
            </Image>
        </li>
        <li>
            <Image 
            src={'/icons/purchases.svg'}
            width={24}
            height={24}
            alt="bin">
            </Image>
        </li>
    </ul> 
    );
}

export default NavIcons;