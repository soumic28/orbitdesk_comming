'use client';

import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface SpotlightTextProps {
    text: string;
    className?: string;
}

export function SpotlightText({ text, className = '', delay = 0 }: SpotlightTextProps & { delay?: number }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        setPosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    const handleMouseEnter = () => setOpacity(1);
    const handleMouseLeave = () => setOpacity(0);

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
                        className="inline-block text-transparent bg-clip-text bg-gradient-to-b from-white/80 to-white/40"
                        style={{ WebkitTextStroke: '1px rgba(255,255,255,0.1)' }}
                    >
                        {char === ' ' ? '\u00A0' : char}
                    </motion.span>
                ))}
            </div>

            {/* Spotlight Overlay (Shiny/Bright) - Matches text layout */}
            <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                    maskImage: `radial-gradient(180px circle at ${position.x}px ${position.y}px, black, transparent)`,
                    WebkitMaskImage: `radial-gradient(180px circle at ${position.x}px ${position.y}px, black, transparent)`,
                }}
                animate={{ opacity }}
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
                        className="inline-block text-transparent bg-clip-text bg-gradient-to-b from-white to-white/80"
                        style={{
                            WebkitTextStroke: '1px rgba(139, 92, 246, 0.8)',
                        }}
                    >
                        {char === ' ' ? '\u00A0' : char}
                    </motion.span>
                ))}
            </motion.div>
        </div>
    );
}
