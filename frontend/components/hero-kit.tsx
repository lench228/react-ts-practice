import Image from "next/image";

interface iHeroKit{
    src: string,
    description: string,
}

function HeroKit({...props}: iHeroKit) {

    return (
     <div className="h-full">
        <Image
         src={props.src}
         alt={props.description}
         width={410}
         height={788}
        ></Image>
        <p className="mt-3 text-center text-2xl">{props.description}</p>
    </div> 
    );
}

export default HeroKit;