import { signOut } from "@/auth";
import UserInfo from "@/components/ui/user-info";
import Image from "next/image";

function Profile() {
  return (
    <div>
      <header className="flex items-center font-semibold text-4xl gap-2 justify-center">
        <p>Профиль</p>
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <button type="submit">
            {" "}
            <Image
              src={"icons/logout.svg"}
              alt={"edit"}
              width={24}
              height={24}
            ></Image>
          </button>
        </form>
      </header>

      <article className="flex justify-center gap-[72px]  mt-12 items-center">
        <UserInfo text="Контакты" data="+7 (999) 999-99-99"></UserInfo>
        <div className="h-11 bg-gray w-[1px]"></div>
        <UserInfo
          text="Адрес доставки"
          data="г. ЕКАТЕРИНБУРГ, ул.  ..."
        ></UserInfo>
        <div className="h-11 bg-gray w-[1px]"></div>
        <UserInfo text="Дата рождения" data="17.02.2004"></UserInfo>
      </article>
      <div className="w-full h-[1px] mt-12 bg-gray mb-20"></div>
    </div>
  );
}

export default Profile;
