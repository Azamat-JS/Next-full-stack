import { Briefcase } from 'lucide-react'
import Link from 'next/link'

const Navbar = () => {
    return (
        <nav className='border-b border-gray-200 bg-white'>
            <div className=' flex h-16 items-center px-4'>
                <Link href={'/'} className='flex items-center space-x-2 gap-2 text-xl font-semibold font-serif'>
                    <Briefcase />
                    Job Tracker
                </Link>
            </div>
        </nav>
    )
}

export default Navbar