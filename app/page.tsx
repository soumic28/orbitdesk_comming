'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { GridPattern } from '@/components/ui/grid-pattern';
import { Navbar } from '@/components/ui/navbar';
import { SpotlightText } from '@/components/ui/spotlight-text';
import { cn } from '@/lib/utils';
import Particles from '@/components/ui/particles';
import { MagneticButton } from '@/components/ui/magnetic-button';

export default function ComingSoon() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#0a0118] text-foreground selection:bg-purple-500/30 font-sans">
      <Navbar />

      {/* Mobile Border Glow Animation */}
      {isMobile && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-50 border-[2px] border-transparent rounded-lg"
          animate={{
            boxShadow: [
              "inset 0 0 20px 0px rgba(139, 92, 246, 0.1)",
              "inset 0 0 40px 5px rgba(217, 70, 239, 0.2)",
              "inset 0 0 20px 0px rgba(139, 92, 246, 0.1)"
            ]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}

      {/* Background Grid - Constant */}
      <div className="absolute inset-0 z-0">
        {/* Interactive Particles - Added behind grid but interactive */}
        <div className="absolute inset-0 z-0">
          <Particles
            className="absolute inset-0"
            quantity={100}
            ease={80}
            refresh
          />
        </div>

        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={isMobile ? {
            opacity: 1,
            x: [0, -20, 0],
            y: [0, -20, 0],
          } : { opacity: 1 }}
          transition={isMobile ? {
            opacity: { delay: 1.5, duration: 1.5 },
            x: { duration: 20, repeat: Infinity, ease: "linear" },
            y: { duration: 20, repeat: Infinity, ease: "linear" }
          } : { delay: 1.5, duration: 1.5 }}
        >
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
        </motion.div>
      </div>

      {/* Massive Background Text "OrbitDesk" - With Spotlight Effect */}
      <div className="absolute inset-0 z-0 flex items-center justify-start md:justify-center overflow-hidden px-6 md:px-12">
        <div className="relative z-10 flex flex-col items-start md:items-center">
          {/* Using a large font size for the background text */}
          <div className="text-[15vw] md:text-[12vw] font-bold leading-none tracking-tighter py-8">
            <SpotlightText text="OrbitDesk" delay={2} transparent={true} />
          </div>
          <motion.div
            className='text-[8vw] md:text-[5vw] font-bold leading-tight tracking-tighter text-left md:text-center py-4'
            animate={isMobile ? {
              opacity: [0.8, 1, 0.8],
              scale: [0.98, 1.02, 0.98]
            } : undefined}
            transition={isMobile ? {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            } : undefined}
          >
            <SpotlightText text="Coming Soon" delay={2.5} />
          </motion.div>
        </div>
      </div>

      {/* The "Dawn" / Flare Effect - Brand Colors (Purple/Magenta - OKLCH 290 hue) */}
      {/* Primary bright flare - Purple */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isMobile ? {
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.3, 0.2]
        } : {
          opacity: 0.2,
          scale: 1
        }}
        transition={isMobile ? {
          scale: { duration: 6, repeat: Infinity, ease: "easeInOut" },
          opacity: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.2 } // Start fading in quickly
        } : {
          duration: 2,
          ease: "easeOut"
        }}
        className="pointer-events-none absolute top-1/2 right-[-10%] h-[80vh] w-[40vw] -translate-y-1/2 rounded-full bg-[#8b5cf6] blur-[120px] mix-blend-screen animate-pulse-slow"
      />
      {/* Secondary glow - Magenta */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isMobile ? {
          scale: [1.1, 1, 1.1],
          opacity: [0.15, 0.25, 0.15]
        } : {
          opacity: 0.15,
          scale: 1
        }}
        transition={isMobile ? {
          scale: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 },
          opacity: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
        } : {
          duration: 2.5,
          ease: "easeOut",
          delay: 0.5
        }}
        className="pointer-events-none absolute top-1/2 right-[-5%] h-[100vh] w-[50vw] -translate-y-1/2 rounded-full bg-[#d946ef] blur-[150px] mix-blend-screen"
      />

      {/* Content Container */}
      <div className="relative z-10 flex min-h-screen flex-col items-start md:items-center justify-center px-6 md:px-12 pt-20 pointer-events-none">

        {/* Input Field Area - Commented out by user */}
        {/* <motion.div ... /> */}

        {/* Bottom Text - Animated Entry */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ delay: 3.5, duration: 1 }}
          className="absolute bottom-24 left-0 right-0 text-left md:text-center px-6 md:px-12 pointer-events-auto"
        >
          <p className="md:mx-auto max-w-2xl text-lg md:text-xl text-purple-100/80 leading-relaxed font-light tracking-wide">
            <span className="text-white font-medium">OrbitDesk</span> is a focused workspace for teams that value clarity over chaos and outcomes over dashboards.
          </p>
        </motion.div>

        {/* Bottom Right Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4, duration: 1 }}
          className="absolute bottom-12 right-12 hidden gap-4 md:flex items-center pointer-events-auto"
        >
          <MagneticButton className="rounded-full border border-purple-500/20 px-6 py-2 text-xs font-medium text-purple-200/60 transition-all hover:bg-purple-500/10 hover:text-purple-100 hover:border-purple-400/40 uppercase tracking-wider hover:shadow-[0_0_15px_rgba(168,85,247,0.3)]">
            Build with OrbitDesk
          </MagneticButton>
          <MagneticButton className="rounded-full border border-purple-500/20 px-6 py-2 text-xs font-medium text-purple-200/60 transition-all hover:bg-purple-500/10 hover:text-purple-100 hover:border-purple-400/40 uppercase tracking-wider hover:shadow-[0_0_15px_rgba(168,85,247,0.3)]">
            Learn More
          </MagneticButton>
        </motion.div>

        {/* Bottom Left Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4.2, duration: 1 }}
          className="absolute bottom-12 left-12 hidden md:block pointer-events-auto"
        >
          <ArrowRight className="h-5 w-5 rotate-90 text-purple-400/50" />
        </motion.div>

      </div>
    </div>
  );
}
