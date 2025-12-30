'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export function Navbar({ className }: { className?: string }) {
    const pathname = usePathname();

    return (
        <nav className={cn("absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-6 md:px-12", className)}>
            <div className="flex items-center gap-3">
                <div className="relative flex h-8 w-8 items-center justify-center">
                    <div className="absolute inset-0 animate-pulse rounded-full bg-blue-500/20 blur-md" />
                    <div className="h-2 w-2 rounded-full bg-blue-400 shadow-[0_0_10px_2px_rgba(96,165,250,0.8)]" />
                </div>
                <Link href="/" className="text-lg font-bold tracking-widest text-white/90 hover:text-white transition-colors">
                    ORBITDESK
                </Link>
            </div>


            <div className="group relative cursor-pointer">
                <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 opacity-30 blur transition duration-500 group-hover:opacity-70" />
                <div className="relative flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-4 py-1.5 text-xs font-medium text-blue-100 backdrop-blur-md transition-colors hover:bg-white/5">
                    <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                    </span>
                    BETA ACCESS
                </div>
            </div>
        </nav>
    );
}
