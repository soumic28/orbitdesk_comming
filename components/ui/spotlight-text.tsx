'use client';

import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface SpotlightTextProps {
    text: string;
    className?: string;
}

export function SpotlightText({ text, className = '' }: SpotlightTextProps) {
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

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`relative select-none ${className}`}
            style={{ cursor: 'default' }}
        >
            {/* Base Text (Dim/Outlined) */}
            <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white/20 to-white/5"
                style={{ WebkitTextStroke: '1px rgba(255,255,255,0.1)' }}>
                {text}
            </span>

            {/* Spotlight Overlay (Shiny/Bright) */}
            <motion.span
                className="absolute inset-0 block text-transparent bg-clip-text bg-gradient-to-b from-white to-white/80"
                style={{
                    WebkitTextStroke: '1px rgba(139, 92, 246, 0.8)', // Purple-500 stroke for shiny edge
                    maskImage: `radial-gradient(180px circle at ${position.x}px ${position.y}px, black, transparent)`,
                    WebkitMaskImage: `radial-gradient(180px circle at ${position.x}px ${position.y}px, black, transparent)`,
                }}
                animate={{ opacity }}
                transition={{ duration: 0.2 }}
            >
                {text}
            </motion.span>
        </div>
    );
}
