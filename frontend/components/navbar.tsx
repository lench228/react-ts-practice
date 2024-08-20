import Image from "next/image";
import Search from "./search-bar";
import NavIcons from "./nav-icons";


function Navbar() {
    return (
    <nav className={`bg-black w-full h-24 flex justify-between items-center py-6 px-10`}>
        <Image
        src={'/icons/logo.svg'}
        width={214}
        height={35.52}
        alt='Movemarket'
        />
        <Search/>
        <NavIcons/>
    </nav> 
    
    );
}

export default Navbar;