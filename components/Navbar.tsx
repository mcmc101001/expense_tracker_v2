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
    let isActive = false;
    if (!segment && href === '/') {
        isActive = true;
    }
    else {
        isActive = href === `/${segment}`;
    }
    
    return (
        <li className={"h-16 pl-0 w-full list-none flex items-center justify-center md:justify-start hover:bg-slate-500 md:pl-4 " + (isActive ? "outline outline-4 -outline-offset-4 outline-slate-900" : "")}>
            <Link className="flex flex-row items-center justify-center md:justify-start text-slate-800 no-underline object-contain" href={href}>
                {icon}
                <span className="pl-0 md:pl-4">{children}</span>
            </Link>
        </li>
    )
}

function Navbar() { 

    return ( 
        <nav className="z-10 md:h-full md:w-48 md:bottom-auto md:flex-col flex items-center bg-slate-100 fixed md:top-0 top-auto bottom-0 w-full h-16 flex-row">
            <div className="hidden md:flex items-center justify-center h-52 w-52 object-contain">
                <Bug />
            </div>
            <div className="flex-row h-full mr-0 ml-0 md:flex md:flex-col items-center md:h-16 w-full">
                <ul className="w-full h-full flex flex-row md:flex-col justify-around items-center md:justify-center">
                    <NavLink icon={<Home className="hidden md:block" />} href="/">Home</NavLink>
                    <NavLink icon={<Expenses className="hidden md:block" />} href="/expenses">Expenses</NavLink>
                </ul>
            </div>
        </nav>
     );
}


export default Navbar;