'use client';

import { motion } from 'framer-motion';

interface TextRingProps {
    text: string;
    radius?: number;
    fontSize?: string;
    className?: string;
}

export function TextRing({ text, radius = 120, fontSize = '1.2rem', className }: TextRingProps) {
    const characters = text.split('');
    const angleStep = 360 / characters.length;

    return (
        <div className={`relative flex items-center justify-center ${className}`} style={{ perspective: '1000px' }}>
            <motion.div
                className="relative flex items-center justify-center transform-style-3d"
                animate={{ rotateY: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                style={{
                    transformStyle: 'preserve-3d',
                    width: radius * 2,
                    height: radius * 2
                }}
            >
                {characters.map((char, i) => (
                    <span
                        key={i}
                        className="absolute font-bold uppercase tracking-widest text-white/90"
                        style={{
                            transform: `rotateY(${i * angleStep}deg) translateZ(${radius}px)`,
                            backfaceVisibility: 'hidden',
                            fontSize: fontSize,
                        }}
                    >
                        {char}
                    </span>
                ))}
            </motion.div>
        </div>
    );
}
