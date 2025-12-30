'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

interface InfoSlidesProps {
    isOpen: boolean;
    onClose: () => void;
}

const slides = [
    {
        title: "What is OrbitDesk?",
        content: (
            <div className="space-y-4">
                <p className="text-lg leading-relaxed text-purple-100/90">
                    OrbitDesk is the <span className="text-purple-400 font-semibold">Mission OS</span> for teams who refuse to settle for chaos.
                </p>
                <p className="text-base text-purple-200/70">
                    We're building a focused workspace that prioritizes clarity over clutter and outcomes over endless dashboards. It's designed to help you launch your best work without the noise.
                </p>
            </div>
        )
    },
    {
        title: "What is Crew?",
        content: (
            <div className="space-y-4">
                <p className="text-lg leading-relaxed text-purple-100/90">
                    Crew is your <span className="text-fuchsia-400 font-semibold">AI-powered teammate</span> that lives within OrbitDesk.
                </p>
                <p className="text-base text-purple-200/70">
                    Unlike standard chatbots, Crew understands your project context. It helps you draft docs, plan sprints, and unblock decisions instantly. It's not just a tool; it's a force multiplier for your team.
                </p>
            </div>
        )
    },
    {
        title: "Why Us?",
        content: (
            <div className="space-y-4">
                <p className="text-lg leading-relaxed text-purple-100/90">
                    Because <span className="text-blue-400 font-semibold">focus is the new currency</span>.
                </p>
                <p className="text-base text-purple-200/70">
                    Existing tools are bloated with features you don't need. We're stripping it back to the essentials—speed, simplicity, and intelligence. We're building for the builders, the makers, and the visionaries.
                </p>
            </div>
        )
    }
];

export function InfoSlides({ isOpen, onClose }: InfoSlidesProps) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    // Reset slide when opening
    useEffect(() => {
        if (isOpen) {
            setCurrentSlide(0);
            setIsPaused(false);
        }
    }, [isOpen]);

    // Auto-slide logic
    useEffect(() => {
        if (!isOpen || isPaused) return;

        const interval = setInterval(() => {
            setCurrentSlide(prev => (prev + 1) % slides.length);
        }, 2000); // Change slide every 2 seconds

        return () => clearInterval(interval);
    }, [isOpen, isPaused]);

    const nextSlide = () => {
        setCurrentSlide(prev => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-md"
                    />

                    {/* Modal Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: "spring", duration: 0.5 }}
                        onMouseEnter={() => setIsPaused(true)}
                        onMouseLeave={() => setIsPaused(false)}
                        className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-[#0a0118]/90 shadow-2xl shadow-purple-500/10 ring-1 ring-white/10"
                    >
                        {/* Header / Close Button */}
                        <div className="absolute right-4 top-4 z-10">
                            <button
                                onClick={onClose}
                                className="rounded-full p-2 text-white/50 transition-colors hover:bg-white/10 hover:text-white"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Content Area */}
                        <div className="flex min-h-[400px] flex-col justify-between p-8">

                            {/* Slide Content */}
                            <div className="flex-1">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={currentSlide}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.3 }}
                                        className="flex flex-col gap-6"
                                    >
                                        <h2 className="text-3xl font-bold tracking-tight text-white">
                                            {slides[currentSlide].title}
                                        </h2>
                                        <div className="text-purple-100/80">
                                            {slides[currentSlide].content}
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            </div>

                            {/* Footer / Navigation */}
                            <div className="mt-8 flex items-center justify-between">
                                {/* Dots Indicator */}
                                <div className="flex gap-2">
                                    {slides.map((_, idx) => (
                                        <div
                                            key={idx}
                                            className={cn(
                                                "h-1.5 rounded-full transition-all duration-300",
                                                idx === currentSlide ? "w-6 bg-purple-500" : "w-1.5 bg-white/20"
                                            )}
                                        />
                                    ))}
                                </div>

                                {/* Nav Buttons */}
                                <div className="flex gap-3">
                                    <button
                                        onClick={prevSlide}
                                        disabled={currentSlide === 0}
                                        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-all hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed"
                                    >
                                        <ChevronLeft className="h-5 w-5" />
                                    </button>
                                    <button
                                        onClick={currentSlide === slides.length - 1 ? onClose : nextSlide}
                                        className="flex h-10 items-center gap-2 rounded-full bg-purple-600 px-4 text-sm font-medium text-white transition-all hover:bg-purple-500"
                                    >
                                        {currentSlide === slides.length - 1 ? (
                                            "Got it"
                                        ) : (
                                            <>
                                                Next <ChevronRight className="h-4 w-4" />
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Decorative Gradient */}
                        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-purple-900/20 to-transparent" />
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
