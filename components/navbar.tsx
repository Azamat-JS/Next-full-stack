import { Suspense } from 'react'
import { ArrowRight, Briefcase } from 'lucide-react'
import Link from 'next/link'
import { Button } from './ui/button'
import { getSession, signOut } from '@/lib/auth/auth'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Avatar, AvatarFallback } from './ui/avatar'

const NavAuth = async () => {
    const session = await getSession();

    if (!session?.user) {
        return (
            <>
                <Link href={'/sign-in'} className='text-gray-700 hover:text-black'>
                    <Button variant="ghost" className="text-gray-700 hover:text-black">Log In</Button>
                </Link>
                <Link href={'/sign-up'}>
                    <Button size={'sm'} className="group h-12 px-8 hover:scale-105 font-bold tracking-wider" variant={'default'}>Start for free <ArrowRight className="transition-transform duration-300 group-hover:translate-x-2" /></Button>
                </Link>
            </>
        )
    }

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
                    <Avatar>
                        <AvatarFallback className="bg-primary text-white">
                            {session.user.name[0].toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuGroup>
                        <DropdownMenuLabel>
                            <div>
                                <p>{session.user.name}</p>
                                <p>{session.user.email}</p>
                            </div>
                        </DropdownMenuLabel>
                    </DropdownMenuGroup>
                    <DropdownMenuItem onClick={async () => signOut()}>
                        Log Out
                    </DropdownMenuItem>
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
