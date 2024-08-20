import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";

interface iLink {
    text: string,
    href?: Url
}
function NavLink({...props}: iLink) {
    return (
     <div>
        <Link
        href={props.href ? props.href : ''}>
            {props.text}
        </Link>
    </div> );
}

export default NavLink;