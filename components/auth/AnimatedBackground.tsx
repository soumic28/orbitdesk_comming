'use client';

import { useEffect, useState } from 'react';

import { motion } from 'framer-motion';

interface Particle {
    id: number;
    x: number;
    y: number;
    size: number;
    duration: number;
    delay: number;
}

export function AnimatedBackground() {
    const [particles, setParticles] = useState<Particle[]>([]);

    useEffect(() => {
        // Generate random particles
        const newParticles: Particle[] = Array.from({ length: 50 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 3 + 1,
            duration: Math.random() * 20 + 20,
            delay: Math.random() * 5,
        }));
        setParticles(newParticles);
    }, []);

    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {/* Animated particles */}
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    className="bg-primary/20 absolute rounded-full"
                    style={{
                        left: `${particle.x}%`,
                        top: `${particle.y}%`,
                        width: particle.size,
                        height: particle.size,
                    }}
                    animate={{
                        y: [0, -30, 0],
                        opacity: [0.2, 0.5, 0.2],
                    }}
                    transition={{
                        duration: particle.duration,
                        repeat: Infinity,
                        delay: particle.delay,
                        ease: 'easeInOut',
                    }}
                />
            ))}

            {/* Grid overlay with perspective */}
            <div className="absolute inset-0 opacity-20">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `
              linear-gradient(to right, oklch(0.55 0.28 290 / 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, oklch(0.55 0.28 290 / 0.1) 1px, transparent 1px)
            `,
                        backgroundSize: '40px 40px',
                        transform: 'perspective(500px) rotateX(60deg)',
                        transformOrigin: 'center bottom',
                    }}
                />
            </div>

            {/* Gradient orbs */}
            <motion.div
                className="bg-primary/20 absolute top-0 -left-1/4 h-96 w-96 rounded-full blur-3xl"
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.2, 0.3, 0.2],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />
            <motion.div
                className="bg-accent/20 absolute -right-1/4 bottom-0 h-96 w-96 rounded-full blur-3xl"
                animate={{
                    scale: [1.2, 1, 1.2],
                    opacity: [0.3, 0.2, 0.3],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 1,
                }}
            />
        </div>
    );
}
