import React from 'react'
import Link from 'next/link';
import { UserNav } from './user-nav';
import { ThemeToggler } from './theme-toggle';
import Logo from './logo';



export default function Header() {

    return (
        <header >
            <div className="container mx-auto px-4">
                <nav className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link href="/" className="flex flex-auto items-center text-2xl font-bold text-foreground">
                            <Logo />
                        </Link>
                    </div>
                    <div className="flex items-center space-x-4">

                        <ThemeToggler />

                        <UserNav />

                    </div>
                </nav>
            </div>
        </header>
    )
}