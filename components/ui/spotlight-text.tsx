'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useMotionTemplate, useMotionValue, animate } from 'framer-motion';

interface SpotlightTextProps {
    text: string;
    className?: string;
    transparent?: boolean;
    autoAnimate?: boolean;
}

export function SpotlightText({ text, className = '', delay = 0, transparent = false, autoAnimate = false }: SpotlightTextProps & { delay?: number }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if (autoAnimate && containerRef.current) {
            const container = containerRef.current;
            const width = container.offsetWidth;
            const height = container.offsetHeight;

            // Center Y
            mouseY.set(height / 2);

            // Animate X continuously from left to right
            // Start slightly before the text and end slightly after to ensure full coverage
            const controls = animate(mouseX, [-150, width + 150], {
                duration: 3.5,
                repeat: Infinity,
                repeatType: "loop",
                ease: "linear",
                repeatDelay: 0 // No delay for continuous flow
            });

            setIsHovered(true);

            return () => controls.stop();
        }
    }, [autoAnimate, mouseX, mouseY]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (autoAnimate || !containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        if (!rect) return; // Extra safety check

        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
    };

    const handleMouseEnter = () => {
        if (!autoAnimate) setIsHovered(true);
    };

    const handleMouseLeave = () => {
        if (!autoAnimate) setIsHovered(false);
    };

    const maskImage = useMotionTemplate`radial-gradient(180px circle at ${mouseX}px ${mouseY}px, black, transparent)`;

    const characters = text.split('');

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`relative select-none inline-block ${className}`}
            style={{ cursor: 'default' }}
        >
            {/* Base Text (Dim/Outlined) - Animated Reveal */}
            <div className="relative">
                {characters.map((char, i) => (
                    <motion.span
                        key={i}
                        initial={{ opacity: 0, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, filter: 'blur(0px)' }}
                        transition={{
                            duration: 0.5,
                            delay: delay + (characters.length - 1 - i) * 0.05, // Right-to-Left delay
                            ease: "easeOut"
                        }}
                        className={`inline-block ${transparent ? 'text-transparent' : 'text-transparent bg-clip-text bg-gradient-to-b from-white/80 to-white/40'}`}
                        style={{
                            WebkitTextStroke: transparent ? '1px rgba(139, 92, 246, 0.4)' : '1px rgba(255,255,255,0.1)'
                        }}
                    >
                        {char === ' ' ? '\u00A0' : char}
                    </motion.span>
                ))}
            </div>

            {/* Spotlight Overlay (Shiny/Bright) - Matches text layout */}
            <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                    maskImage,
                    WebkitMaskImage: maskImage,
                }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.2 }}
            >
                {characters.map((char, i) => (
                    <motion.span
                        key={i}
                        initial={{ opacity: 0 }} // Start hidden, reveal matches base text
                        animate={{ opacity: 1 }}
                        transition={{
                            duration: 0.5,
                            delay: delay + (characters.length - 1 - i) * 0.05,
                            ease: "easeOut"
                        }}
                        className={`inline-block ${transparent ? 'text-transparent' : 'text-transparent bg-clip-text bg-gradient-to-b from-white to-white/80'}`}
                        style={{
                            WebkitTextStroke: transparent ? '1px rgba(139, 92, 246, 1)' : '1px rgba(139, 92, 246, 0.8)',
                        }}
                    >
                        {char === ' ' ? '\u00A0' : char}
                    </motion.span>
                ))}
            </motion.div>
        </div>
    );
}
