import AnchorBtn from "./ui/anchor-btn";

function HeroPromo() {
  return (
    <div className="text-xs h-[708px] max-w-[1286px] flex bg-promo items-center justify-center">
      <div className="gap-8 p-20 bg-white bg-opacity-80 rounded-[20px] flex flex-col justify-center items-center">
        <h2 className="text-[2.5rem]">SPRING SALE</h2>
        <div className="flex flex-col gap-8 font-medium">
          <p className="font-medium text-xl">-20% на новую коллекцию</p>
          <AnchorBtn />
        </div>
      </div>
    </div>
  );
}

export default HeroPromo;
