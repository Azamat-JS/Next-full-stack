"use client";

import { signOut } from '@/lib/auth/auth-client';
import { DropdownMenuItem } from './ui/dropdown-menu';
import { useRouter } from 'next/navigation';

const SignOutBtn = () => {
    const router = useRouter()
    return (
        <DropdownMenuItem variant='destructive' onClick={async () => {
            const res = await signOut();
            if (res.data) {
                router.push('/sign-in')
            } else {
                alert('Error logout')
            }
        }
        }
        >
            Log Out
        </DropdownMenuItem>
    )
}

export default SignOutBtn