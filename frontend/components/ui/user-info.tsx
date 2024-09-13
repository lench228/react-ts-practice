interface iUserInfo {
  text: string;
  data: string;
}

function UserInfo({ text, data }: iUserInfo) {
  return (
    <article className="flex flex-col gap-4 items-center">
      <h2 className="text-[#565656] text-sm">{text}</h2>
      <p className="text-[#1d1d1d] text-lg font-semibold">{data}</p>
    </article>
  );
}

export default UserInfo;
