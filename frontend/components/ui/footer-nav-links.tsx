import Link from "next/link";
import { LinkItem } from "../footer";

interface iFooterLinks {
  links: LinkItem[];
  header: string;
}

function FooterLinks({ links, header }: iFooterLinks) {
  return (
    <li>
      <h2>{header}</h2>
      <ul>
        {links.map((link) => (
          <li key={link.label} className="text-[#c4c4c4]">
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </li>
  );
}

export default FooterLinks;
