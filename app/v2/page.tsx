'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { GridPattern } from '@/components/ui/grid-pattern';
import { Navbar } from '@/components/ui/navbar';
import { SpotlightText } from '@/components/ui/spotlight-text';
import { cn } from '@/lib/utils';

export default function PageV2() {
    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-[#0a0118] text-foreground selection:bg-purple-500/30 font-sans">
            <Navbar />

            {/* Background Grid - Constant */}
            <div className="absolute inset-0 z-0">
                <GridPattern
                    width={60}
                    height={60}
                    x={-1}
                    y={-1}
                    strokeDasharray={'4 2'}
                    className={cn(
                        '[mask-image:radial-gradient(1000px_circle_at_center,white,transparent)]',
                        'fill-purple-500/5 stroke-purple-500/5'
                    )}
                />
            </div>

            {/* Massive Background Text "OrbitDesk" - With Spotlight Effect */}
            <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="relative z-10"
                >
                    {/* Using a large font size for the background text */}
                    <div className="text-[18vw] font-bold leading-none tracking-tighter p-8">
                        <SpotlightText text="OrbitDesk" />
                    </div>
                    <div className='text-[8vw] font-bold leading-tight tracking-tighter text-center py-4'>

                        <SpotlightText text="Coming Soon" />
                    </div>
                </motion.div>
            </div>

            {/* The "Dawn" / Flare Effect - Brand Colors (Purple/Magenta - OKLCH 290 hue) */}
            {/* Primary bright flare - Purple */}
            <div className="pointer-events-none absolute top-1/2 right-[-10%] h-[80vh] w-[40vw] -translate-y-1/2 rounded-full bg-[#8b5cf6] blur-[120px] opacity-20 mix-blend-screen animate-pulse-slow" />
            {/* Secondary glow - Magenta */}
            <div className="pointer-events-none absolute top-1/2 right-[-5%] h-[100vh] w-[50vw] -translate-y-1/2 rounded-full bg-[#d946ef] blur-[150px] opacity-15 mix-blend-screen" />

            {/* Content Container */}
            <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 pt-20 pointer-events-none">

                {/* Input Field Area - Commented out by user */}
                {/* <motion.div ... /> */}

                {/* Bottom Text - Animated Entry */}
                <motion.div
                    initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="absolute bottom-24 left-0 right-0 text-center px-4 pointer-events-auto"
                >
                    <p className="mx-auto max-w-2xl text-lg md:text-xl text-purple-100/80 leading-relaxed font-light tracking-wide">
                        We are thrilled to unveil <span className="text-white font-medium">OrbitDesk </span>, our most advanced mission OS yet, <br className="hidden md:block" />
                        blending superior reasoning with extensive integration capabilities.
                    </p>
                </motion.div>

                {/* Bottom Right Actions */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 1 }}
                    className="absolute bottom-12 right-12 hidden gap-4 md:flex items-center pointer-events-auto"
                >
                    <button className="rounded-full border border-purple-500/20 px-6 py-2 text-xs font-medium text-purple-200/60 transition-all hover:bg-purple-500/10 hover:text-purple-100 hover:border-purple-400/40 uppercase tracking-wider hover:shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                        Build with OrbitDesk
                    </button>
                    <button className="rounded-full border border-purple-500/20 px-6 py-2 text-xs font-medium text-purple-200/60 transition-all hover:bg-purple-500/10 hover:text-purple-100 hover:border-purple-400/40 uppercase tracking-wider hover:shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                        Learn More
                    </button>
                </motion.div>

                {/* Bottom Left Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="absolute bottom-12 left-12 hidden md:block pointer-events-auto"
                >
                    <ArrowRight className="h-5 w-5 rotate-90 text-purple-400/50" />
                </motion.div>

            </div>

            <style jsx global>{`
        .animate-pulse-slow {
          animation: pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 0.25; }
        }
      `}</style>
        </div>
    );
}
