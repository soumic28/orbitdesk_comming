'use client';

import { motion } from 'framer-motion';

interface CircularTextProps {
    text: string;
    radius?: number;
    className?: string;
}

export function CircularText({ text, radius = 100, className }: CircularTextProps) {
    const characters = text.split('');
    const angleStep = 360 / characters.length;

    return (
        <motion.div
            className={`relative flex items-center justify-center ${className}`}
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            style={{ width: radius * 2, height: radius * 2 }}
        >
            {characters.map((char, i) => (
                <span
                    key={i}
                    className="absolute left-1/2 top-0 origin-bottom font-mono text-sm font-bold uppercase tracking-widest text-primary/80"
                    style={{
                        height: `${radius}px`,
                        transform: `rotate(${i * angleStep}deg) translateX(-50%)`,
                        transformOrigin: 'bottom center',
                    }}
                >
                    {char}
                </span>
            ))}
        </motion.div>
    );
}
