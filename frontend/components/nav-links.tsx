import NavLink from "./nav-link";

const links = [
    'Новинки',
    'Ванная',
    'Кухня',
    'Спальня'
]

function NavLinks() {
    return ( 
    <div>  
        <ul className={`flex gap-6 justify-center m-9`}>
            {links.map((link, index)=> {
                return (<li key={index}>
                    <NavLink text={link}></NavLink>
                </li>)
            })}
        </ul>

    </div> 
    );
}

export default NavLinks;