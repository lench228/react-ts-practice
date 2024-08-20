import Image from "next/image";
import { montserrat } from "./ui/fonts";

function Search() {
    return ( 
    <div className="bg-[#D9D9D9] flex w-1/2 py-2 px-5 rounded-[20px]">
        <input  type="text" className={`bg-transparent w-full ${montserrat.className} text-gray`} placeholder="поиск"/>
        <Image

            src={'/icons/search.svg'}
            width={25}
            height={25}
            alt={'Search'}
        />
    </div>
    
);
}

export default Search;