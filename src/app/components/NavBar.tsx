'use client';
import { Avatar, Box, Container, DropdownMenu, Flex } from '@radix-ui/themes';
import classnames from 'classnames';
import { useSession } from "next-auth/react";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LuListTodo } from "react-icons/lu";

const NavBar = () => {

    const currentPath = usePathname();
    const { status, data: user } = useSession();

    const links = [{
        label: 'Dashboard',
        link: '/dashboard'
    }, {
        label: 'Issue',
        link: '/issue'
    }];

    const getClassnames = (link: { label: string, link: string }) => classnames({
        'nav-link': true,
        'text-zinc-900': currentPath === link.link
    });

    return (
        // <nav className='border-b mb-5 px-5 h-14'>
        <nav className="border-b mb-2 px-5 py-3">
            <Container>
                <Flex align="center" gap="4" justify="between">
                    <Box >
                        <Flex align="center" gap="4">
                            <Link href={"/"} className=''>
                                <LuListTodo></LuListTodo>
                            </Link>
                            <ul className='flex space-x-6'>
                                {links
                                    .map(link =>
                                    (
                                        <li key={link.label}>
                                            <Link
                                                className={getClassnames(link)}
                                                href={link.link}
                                            >
                                                {link.label}
                                            </Link>
                                        </li>)
                                    )
                                }
                            </ul>
                        </Flex>
                    </Box>
                    <Box>
                        {status === "authenticated" ?
                            <DropdownMenu.Root>
                                <DropdownMenu.Trigger>
                                    <Avatar
                                        className='cursor-pointer'
                                        radius="full"
                                        src={user.user?.image!}
                                        fallback={user.user?.name!}
                                    />
                                </DropdownMenu.Trigger>
                                <DropdownMenu.Content>
                                    <DropdownMenu.Label>
                                        {user.user?.email}
                                    </DropdownMenu.Label>
                                    <DropdownMenu.Item>
                                        <Link href={"/api/auth/signout"}>
                                            Log Out
                                        </Link>
                                    </DropdownMenu.Item>
                                </DropdownMenu.Content>
                            </DropdownMenu.Root>
                            :
                            <Link href={"/api/auth/signin"}
                                className="nav-link"
                            >Sign In</Link>
                        }
                    </Box>
                </Flex>
            </Container>
        </nav>
    )
}

export default NavBar
