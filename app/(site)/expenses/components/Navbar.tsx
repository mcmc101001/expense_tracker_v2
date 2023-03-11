'use client'

import Link from 'next/link';
import Bug from './svgs/Bug';
import Home from './svgs/Home';
import Expenses from './svgs/Expenses';
import { usePathname } from 'next/navigation';

const navFunctions = [
    {name: "Home", link: "/"},
    {name: "Expenses", link: "/expenses"},
]

interface NavLinkProps {
    name: string;
    link: string;
    icon: any;
}

const NavLink = ({name, link, icon}: NavLinkProps) => {
    const isActive = usePathname() === link;
    return (
        <li className={`${isActive && "nav-link-active"}`} key={name}>
            <Link className="icon-enclose" key={name} href={link}>
                {icon}
                <span>{name}</span>
            </Link>
        </li>
    )
}

function Navbar() { 

    const navList = navFunctions.map((navFunction) => {
        let svgIcon:any;
        if (navFunction.name === "Home") {
            svgIcon = <Home />
        }
        else if (navFunction.name === "Expenses") {
            svgIcon = <Expenses />
        }

        return (
           <NavLink key={navFunction.name} name={navFunction.name} icon={svgIcon} link={navFunction.link} />
        )
    })

    return ( 
        <nav className="navbar">
            <div className="navbar-logo icon-enclose">
                <Bug />
            </div>
            <div className="navbar-items">
                <ul>
                    {navList}
                </ul>
            </div>
        </nav>
     );
}


export default Navbar;