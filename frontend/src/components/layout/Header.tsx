"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Menu, X, Sparkles, School } from 'lucide-react';

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navItems = [
        { name: 'Home', href: '/' },
        { name: 'Leaderboard', href: '/leaderboard' },
        { name: 'Contact', href: '/contact' },
        { name: 'About', href: '/about' }
    ];

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-20 flex items-center ${isScrolled ? 'bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm' : 'bg-transparent'}`}>
            <nav className="container mx-auto px-6 flex items-center justify-between">
                <Link href="/" className="flex items-center space-x-2 group">
                    <div className="text-primary group-hover:scale-110 transition-transform">
                        <School className="w-10 h-10 fill-current" />
                    </div>
                    <h1 className="text-2xl font-black tracking-tight text-slate-900">
                        Talentley <span className="text-primary">School</span>
                    </h1>
                </Link>

                <div className="hidden lg:flex items-center space-x-8">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href || '#'}
                            className={`text-sm font-bold transition-colors relative group py-2 ${isScrolled ? 'text-slate-600 hover:text-primary' : 'text-slate-700 hover:text-primary'}`}
                        >
                            {item.name}
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
                        </Link>
                    ))}
                </div>

                <div className="flex items-center space-x-4">
                    <Link href="/login" className={`px-6 py-2.5 text-sm font-bold border-2 border-primary rounded-xl transition-all ${isScrolled ? 'text-primary hover:bg-primary/10' : 'text-primary hover:bg-primary/10'}`}>
                        Login
                    </Link>
                    <Link href="/register" className={`px-6 py-2.5 text-sm font-bold bg-primary text-white border-2 border-primary rounded-xl transition-all shadow-md hover:bg-primary/90 hover:shadow-lg`}>
                        Register
                    </Link>
                    <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden p-2 text-slate-900">
                        {isMobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </nav>
        </header>
    );
}
