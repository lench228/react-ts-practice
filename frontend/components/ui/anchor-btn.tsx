import Image from "next/image";
import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    
  }

function AnchorBtn(props : ButtonProps) {
    return (
    <button {...props} className="font-semibold text-white flex p-4 items-center gap-2 bg-[#404444] rounded-[50px] min-w-40 justify-center">
        К покупкам 
        <Image
        src={'/icons/arrow-rigth.svg'}
        alt={'next'}
        width={24}
        height={0}
        >
        </Image>
    </button> 

    );
}

export default AnchorBtn;