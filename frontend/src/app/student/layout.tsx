"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
    LayoutDashboard, 
    BookOpen, 
    Trophy, 
    LogOut,
    Menu,
    X,
    Bell,
    UserCircle,
    ChevronRight,
    Sparkles,
    CheckCircle2,
    ChevronDown,
    GraduationCap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function StudentLayout({ children }: { children: React.ReactNode }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isClassesDropdownOpen, setIsClassesDropdownOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 10);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { name: 'Home', path: '/student' },
        { name: 'Classes', path: '/student/classes', hasDropdown: true },
        { name: 'Contact', path: '/student/contact' },
        { name: 'Exams', path: '/student/exams' }
    ];

    const classNumbers = Array.from({ length: 10 }, (_, i) => i + 1);

    return (
        <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans">
            {/* Top Navigation Header */}
            <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-20 flex items-center ${isScrolled ? 'bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm' : 'bg-white border-b border-slate-100'}`}>
                <div className="container mx-auto px-6 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/student" className="flex items-center space-x-3 group">
                        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                            <Sparkles className="w-6 h-6" />
                        </div>
                        <span className="text-2xl font-black text-slate-900 tracking-tighter">
                            Talentley<span className="text-secondary">.</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-10">
                        {navItems.map((item) => {
                            const isActive = pathname === item.path || (item.path !== '/student' && pathname.startsWith(item.path));
                            
                            if (item.hasDropdown) {
                                return (
                                    <div 
                                        key={item.name}
                                        className="relative group py-2"
                                        onMouseEnter={() => setIsClassesDropdownOpen(true)}
                                        onMouseLeave={() => setIsClassesDropdownOpen(false)}
                                    >
                                        <button 
                                            className={`text-sm font-bold transition-all flex items-center gap-2 ${isActive ? 'text-primary' : 'text-slate-600 hover:text-primary'}`}
                                        >
                                            {isActive && <div className="size-1.5 bg-primary rounded-full animate-pulse" />}
                                            {item.name}
                                            <ChevronDown size={14} className={`transition-transform duration-300 ${isClassesDropdownOpen ? 'rotate-180' : ''}`} />
                                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
                                        </button>

                                        <AnimatePresence>
                                            {isClassesDropdownOpen && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-64 z-50"
                                                >
                                                    <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden p-2 grid grid-cols-2 gap-1">
                                                        <div className="col-span-2 px-3 py-2 border-b border-slate-50 mb-1">
                                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Select Your Class</p>
                                                        </div>
                                                        {classNumbers.map((num) => (
                                                            <Link
                                                                key={num}
                                                                href={`/student/classes/${num}`}
                                                                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-primary/5 text-slate-600 hover:text-primary transition-all group/item"
                                                            >
                                                                <div className="size-7 bg-slate-50 group-hover/item:bg-primary/10 rounded-lg flex items-center justify-center text-xs font-bold transition-colors">
                                                                    {num}
                                                                </div>
                                                                <span className="text-xs font-bold whitespace-nowrap">Class {num}</span>
                                                            </Link>
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                );
                            }

                            return (
                                <Link 
                                    key={item.name} 
                                    href={item.path} 
                                    className={`text-sm font-bold transition-all relative group py-2 flex items-center gap-2 ${isActive ? 'text-primary' : 'text-slate-600 hover:text-primary'}`}
                                >
                                    {isActive && <div className="size-1.5 bg-primary rounded-full animate-pulse" />}
                                    {item.name}
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* User Actions */}
                    <div className="flex items-center space-x-6">
                        <button className="relative w-10 h-10 bg-slate-50 rounded-xl hidden md:flex items-center justify-center hover:bg-slate-100 transition-colors text-slate-500 hover:text-primary border border-slate-200">
                            <Bell size={20} />
                            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white animate-pulse"></span>
                        </button>
                        
                        <div className="flex items-center gap-3 pl-6 border-l border-slate-200 hidden md:flex">
                            <div className="text-right">
                                <p className="text-xs font-black text-slate-900 uppercase tracking-widest leading-none mb-1">Sarah W.</p>
                                <p className="text-[10px] font-bold text-slate-400">Class 10</p>
                            </div>
                            <Link href="/login/student" className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white hover:bg-primary transition-colors hover:scale-105 active:scale-95 shadow-md group">
                                <LogOut size={16} className="group-hover:-translate-x-0.5 transition-transform" />
                            </Link>
                        </div>

                        {/* Mobile Menu Toggle */}
                        <button 
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
                            className="md:hidden p-2 text-slate-600 hover:text-primary bg-slate-50 rounded-xl"
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Navigation Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-x-0 top-20 bg-white border-b border-slate-200 shadow-xl z-40 md:hidden flex flex-col p-6 space-y-4"
                    >
                        {navItems.map((item) => {
                            if (item.hasDropdown) {
                                return (
                                    <div key={item.name} className="flex flex-col space-y-2">
                                        <div className="px-4 text-xs font-black text-slate-400 uppercase tracking-widest mt-2">{item.name}</div>
                                        <div className="grid grid-cols-2 gap-2">
                                            {classNumbers.map((num) => (
                                                <Link 
                                                    key={num}
                                                    href={`/student/classes/${num}`}
                                                    onClick={() => setIsMobileMenuOpen(false)}
                                                    className={`text-sm font-bold p-3 rounded-xl flex items-center gap-3 ${pathname === `/student/classes/${num}` ? 'bg-primary/5 text-primary' : 'bg-slate-50 text-slate-600'}`}
                                                >
                                                    <div className="size-6 bg-white rounded-md flex items-center justify-center text-[10px] font-bold shadow-sm">{num}</div>
                                                    Class {num}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                );
                            }
                            return (
                                <Link 
                                    key={item.name}
                                    href={item.path}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`text-lg font-black p-4 rounded-2xl ${pathname === item.path ? 'bg-primary/5 text-primary' : 'text-slate-600 hover:bg-slate-50'}`}
                                >
                                    {item.name}
                                </Link>
                            );
                        })}
                        <div className="h-px bg-slate-100 my-4" />
                        <Link 
                            href="/login/student"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-lg font-black p-4 rounded-2xl text-rose-500 hover:bg-rose-50 flex items-center justify-between"
                        >
                            Logout <LogOut size={20} />
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Content Area */}
            <main className="flex-grow pt-20">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={pathname}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="min-h-[calc(100vh-5rem)]"
                    >
                        {children}
                    </motion.div>
                </AnimatePresence>
            </main>
        </div>
    );
}
