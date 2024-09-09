interface iPrice {
  cost: number;
  sale?: number;
}

function Price({ cost, sale }: iPrice) {
  return (
    <p className="text-xl text-[#1d1d1d] font-semibold">
      {!sale ? (
        <>
          <span>{cost} ₽</span>
        </>
      ) : (
        <>
          <span className="line-through">{cost} ₽ </span>

          <span className=""> {cost - cost * (sale / 100)} ₽</span>
        </>
      )}
    </p>
  );
}

export default Price;
