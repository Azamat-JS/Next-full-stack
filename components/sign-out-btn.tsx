"use client";

import { DropdownMenuItem } from './ui/dropdown-menu';
import { signOut } from '@/lib/auth/auth';

const SignOutBtn = () => {
    return (
        <DropdownMenuItem onClick={async () => signOut()}>
            Log Out
        </DropdownMenuItem>
    )
}

export default SignOutBtn