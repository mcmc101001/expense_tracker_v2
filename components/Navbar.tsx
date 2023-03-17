'use client'

import Link from 'next/link';
import Bug from '@/components/svgs/Bug';
import Home from '@/components/svgs/Home';
import Expenses from '@/components/svgs/Expenses';
import { useSelectedLayoutSegment } from 'next/navigation';

interface NavLinkProps {
    children: string;
    href: string;
    icon: any;
}

const NavLink = ({children, href, icon}: NavLinkProps) => {
    let segment = useSelectedLayoutSegment();
    let isActive = href === `/${segment}`;
    console.log({href, isActive});
    
    return (
        <li className={isActive ? "nav-link-active" : ""}>
            <Link className="icon-enclose" href={href}>
                {icon}
                <span>{children}</span>
            </Link>
        </li>
    )
}

function Navbar() { 

    return ( 
        <nav className="navbar">
            <div className="navbar-logo icon-enclose">
                <Bug />
            </div>
            <div className="navbar-items">
                <ul>
                    <NavLink icon={<Home />} href="/">Home</NavLink>
                    <NavLink icon={<Expenses />} href="/expenses">Expenses</NavLink>
                </ul>
            </div>
        </nav>
     );
}


export default Navbar;