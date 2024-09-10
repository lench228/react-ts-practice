import FooterLinks from "./ui/footer-nav-links";

export interface LinkItem {
  href: string;
  label: string;
}

const links = [
  {
    header: "ПОМОЩЬ",
    links: [
      {
        href: "/test",
        label: "Мой профиль",
      },
    ],
  },
  {
    header: "Каталог",
    links: [
      {
        href: "/test",
        label: "новинки",
      },
      {
        href: "/test",
        label: "КУХНЯ",
      },
      {
        href: "/test",
        label: "ВАННАЯ",
      },
      {
        href: "/test",
        label: "спальня",
      },
      {
        href: "/test",
        label: "Любимые бренды",
      },
      {
        href: "/test",
        label: "sALE%",
      },
    ],
  },
  {
    header: "Свяжитесь с нами",
    links: [
      {
        href: "/test",
        label: "Контакты",
      },
    ],
  },
];

function Footer() {
  return (
    <footer className="bg-[#417060] text-white px-80 py-28">
      <nav className="uppercase">
        <ul className="flex items-center justify-around">
          {links.map((link) => {
            return (
              <FooterLinks
                key={link.header}
                links={link.links}
                header={link.header}
              />
            );
          })}
        </ul>
      </nav>
    </footer>
  );
}

export default Footer;
