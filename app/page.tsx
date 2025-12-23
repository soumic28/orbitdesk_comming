'use client';

import { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Sparkles, Clock } from 'lucide-react';

import { AnimatedBackground } from '@/components/auth/AnimatedBackground';
import { GridPattern } from '@/components/ui/grid-pattern';
import { TextRing } from '@/components/ui/text-ring';
import { cn } from '@/lib/utils';
import { Navbar } from '@/components/ui/navbar';

export default function ComingSoon() {
  // Mouse Parallax State
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isMobile, setIsMobile] = useState(false);

  // Smooth spring for the parallax
  const springConfig = { damping: 30, stiffness: 200 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 768) return; // Skip mouse tracking on mobile

      // Normalize mouse position from -0.5 to 0.5
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', checkMobile);
    };
  }, [mouseX, mouseY]);

  // Parallax Transforms (Desktop)
  const horizonX = useTransform(springX, [-0.5, 0.5], ['-2%', '2%']);
  const horizonY = useTransform(springY, [-0.5, 0.5], ['-1%', '1%']);

  // Text Ring transforms (Desktop)
  const textRingRotateX = useTransform(springY, [-0.5, 0.5], [75, 65]);
  const textRingRotateY = useTransform(springX, [-0.5, 0.5], [-10, 10]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-zinc-950 text-foreground selection:bg-primary/20 perspective-1000">

      {/* Navigation Bar */}
      <Navbar />

      {/* Background Layer */}
      <div className="absolute inset-0 z-0 bg-zinc-950">
        <AnimatedBackground />
        <div className="absolute inset-0">
          <GridPattern
            width={60}
            height={60}
            x={-1}
            y={-1}
            strokeDasharray={'4 2'}
            className={cn(
              '[mask-image:radial-gradient(900px_circle_at_center,white,transparent)]',
              'fill-white/5 stroke-white/5'
            )}
          />
        </div>
      </div>

      {/* Massive Horizon Arc (The Blackhole/Planet) */}
      <motion.div
        style={!isMobile ? { x: horizonX, y: horizonY } : undefined}
        animate={isMobile ? {
          scale: [1, 1.05, 1],
        } : undefined}
        transition={isMobile ? {
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        } : undefined}
        className="pointer-events-none absolute top-1/2 left-1/2 z-10 h-[60vw] w-[60vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-black shadow-[0_0_50px_15px_rgba(59,130,246,0.6),0_0_120px_40px_rgba(168,85,247,0.4)] md:h-[25vw] md:w-[25vw] md:shadow-[0_0_100px_30px_rgba(59,130,246,0.6),0_0_240px_80px_rgba(168,85,247,0.4)]"
      >
        {/* Glowing Rim (Nova Effect) - Sharp & Intense */}
        <motion.div
          animate={isMobile ? { opacity: [0.5, 0.8, 0.5] } : undefined}
          transition={isMobile ? { duration: 4, repeat: Infinity, ease: "easeInOut" } : undefined}
          className="absolute inset-0 rounded-full border-[3px] border-blue-400/50 blur-[4px]"
        />
        <div className="absolute inset-0 rounded-full border-[1px] border-white/40 blur-[1px]" />

        {/* Inner Atmosphere */}
        <div className="absolute inset-0 rounded-full bg-radial-gradient from-black via-black to-blue-900/20 opacity-80" />

        {/* Inner Shadow for depth */}
        <div className="absolute inset-0 rounded-full bg-black shadow-[inset_0_0_60px_20px_rgba(0,0,0,1)]" />
      </motion.div>

      {/* 3D Text Ring - Positioned to orbit the horizon */}
      <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center overflow-hidden">
        <motion.div
          style={!isMobile ? {
            rotateX: textRingRotateX,
            rotateY: textRingRotateY,
            y: 0
          } : {
            rotateX: 70, // Fixed tilt for mobile
            y: 0
          }}
          animate={isMobile ? {
            rotateY: [0, 360]
          } : undefined}
          transition={isMobile ? {
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          } : undefined}
          className="perspective-1000"
        >
          <TextRing
            text="COMING SOON  "
            radius={isMobile ? 130 : 290}
            fontSize={isMobile ? "2.5rem" : "4.5rem"}
            className="opacity-60 text-blue-200/80"
          />
        </motion.div>
      </div>

      {/* Footer Features - Moved out of main since main is gone */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="absolute bottom-10 left-0 right-0 flex justify-center gap-8 text-sm text-muted-foreground z-20"
      >
        {/* <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-blue-400" />
          <span>AI-Powered</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-purple-400" />
          <span>Real-time Sync</span>
        </div> */}
      </motion.div>

      <style jsx global>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          animation: gradient 6s ease infinite;
        }
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </div>
  );
}
