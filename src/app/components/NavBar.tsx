'use client';
import Link from 'next/link'
import { LuListTodo } from "react-icons/lu";
import React from 'react'
import { usePathname } from 'next/navigation';
import classnames from 'classnames';

const NavBar = () => {

    const currentPath = usePathname();

    console.log(currentPath)

    const links = [{
        label: 'Dashboard',
        link: '/dashboard'
    }, {
        label: 'Issue',
        link: '/issue'
    }];

    const getClassnames = (link: {label: string, link: string}) => classnames({
        'text-zinc-500': currentPath !== link.link,
        'text-zinc-900': currentPath === link.link,
        'hover:text-zinc-800 transition-colors': true
    })

    

  return (
    <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center '>
        <Link href={"/"} className=''>
            <LuListTodo></LuListTodo>
        </Link>
        <ul className='flex space-x-6'>
            {links
                .map(link =>
                    (<Link
                        className={getClassnames(link)}
                        href={link.link}
                        key={link.label}>
                        {link.label}
                    </Link>)
                )
            }
        </ul>
    </nav>
  )
}

export default NavBar