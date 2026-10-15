'use client'

import { Suspense } from 'react'
import { Briefcase } from 'lucide-react'
import Link from 'next/link'
import { Button } from './ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuLabel, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Avatar, AvatarFallback } from './ui/avatar'
import SignOutBtn from './sign-out-btn'
import { useSession } from '@/lib/auth/auth-client'

const NavAuth = () => {
    const { data: session } = useSession()

    return (
        <>
            <Link href="/dashboard">
                <Button
                    variant="ghost"
                    className="text-gray-700 hover:text-black">
                    Dashboard
                </Button>
            </Link>
            <DropdownMenu>
                <DropdownMenuTrigger render={<Button variant="ghost" />}>
                    <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary text-white">
                            {session?.user.name[0].toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align='end'>
                    <DropdownMenuGroup>
                        <DropdownMenuLabel className="font-normal">
                            <div className='flex flex-col space-y-1'>
                                <p className='text-sm font-medium leading-none'>{session?.user.name}</p>
                                <p className='text-xs leading-none text-muted-foreground'>{session?.user.email}</p>
                            </div>
                        </DropdownMenuLabel>
                    </DropdownMenuGroup>
                    <SignOutBtn />
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}

const Navbar = () => {
    return (
        <nav className='border-b fixed w-full border-gray-200 bg-white'>
            <div className='container mx-auto flex h-16 items-center px-4 justify-between'>
                <Link href={'/'} className='flex items-center space-x-2 gap-2 text-xl font-semibold font-serif'>
                    <Briefcase />
                    Job Tracker
                </Link>
                <div className='flex items-center gap-4'>
                    <Suspense fallback={<div className='h-9 w-32' />}>
                        <NavAuth />
                    </Suspense>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
