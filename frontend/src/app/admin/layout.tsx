"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Users,
    BookOpen,
    MessageSquare,
    Trophy,
    Settings,
    LogOut,
    Menu,
    X,
    Bell,
    Search,
    Sparkles,
    School,
    Shield,
    Globe,
    Image as ImageIcon,
    FileQuestion,
    CheckSquare,
    Book,
    FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const pathname = usePathname();

    const menuGroups = [
        {
            group: 'Core',
            items: [
                { name: 'Dashboard Overview', icon: LayoutDashboard, path: '/admin/dashboard' },
            ]
        },
        {
            group: 'Website & Ads Control',
            items: [
                { name: 'Landing Page Editor', icon: Globe, path: '/admin/landing' },
                { name: 'Student Home Control', icon: ImageIcon, path: '/admin/advertisements' },
                { name: 'Student Announcements', icon: MessageSquare, path: '/admin/announcements' }
            ]
        },
        {
            group: 'Academic & Exams Control',
            items: [
                { name: 'Manage Exams', icon: BookOpen, path: '/admin/exams' },
                { name: 'Question Bank', icon: FileQuestion, path: '/admin/questions' },
                { name: 'Submissions & Results', icon: CheckSquare, path: '/admin/results' },
                { name: 'Manage Students', icon: Users, path: '/admin/students' },
                { name: 'Manage Classes', icon: Book, path: '/admin/classes' },
                { name: 'Leaderboard Control', icon: Trophy, path: '/admin/winners' },
            ]
        },
        {
            group: 'System & Security',
            items: [
                { name: 'System Reports', icon: FileText, path: '/admin/reports' },
                { name: 'Manage Admins', icon: Shield, path: '/admin/admins' },
                { name: 'System Settings', icon: Settings, path: '/admin/settings' },
            ]
        }
    ];

    return (
        <div className="h-screen bg-white flex overflow-hidden text-slate-900 relative font-sans">
            {/* Vibrant Mesh Gradient Background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden bg-slate-50/50">
                <motion.div
                    animate={{
                        scale: [1, 1.4, 1],
                        rotate: [0, 90, 0],
                        x: [0, 150, 0],
                        y: [0, -100, 0]
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute top-[-30%] right-[-20%] w-[100%] h-[100%] bg-[radial-gradient(circle,rgba(236,91,19,0.3)_0%,transparent_75%)] blur-[150px]"
                ></motion.div>
                <motion.div
                    animate={{
                        scale: [1.3, 1, 1.3],
                        rotate: [0, -90, 0],
                        x: [0, -150, 0],
                        y: [0, 100, 0]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-[-30%] left-[-20%] w-[100%] h-[100%] bg-[radial-gradient(circle,rgba(236,91,19,0.2)_0%,transparent_75%)] blur-[150px]"
                ></motion.div>
                <div className="absolute top-[20%] left-[10%] w-[60%] h-[60%] bg-[radial-gradient(circle,rgba(236,91,19,0.15)_0%,transparent_75%)] blur-[120px]"></div>
            </div>

            {/* Sidebar Overlay for Mobile */}
            <AnimatePresence>
                {(!isSidebarOpen) && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsSidebarOpen(true)}
                        className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-40 lg:hidden"
                    />
                )}
            </AnimatePresence>

            {/* Premium Sidebar */}
            <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-80 bg-white/40 backdrop-blur-3xl border-r border-white/50 transition-all duration-700 overflow-hidden flex flex-col h-full shadow-[30px_0_60px_-15px_rgba(0,0,0,0.02)] ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:hidden'}`}>
                <div className="p-10 flex items-center gap-5 group cursor-pointer">
                    <div className="bg-primary rounded-[1.5rem] p-3.5 flex items-center justify-center text-white shadow-2xl shadow-primary/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 ring-4 ring-primary/10">
                        <School className="w-7 h-7" />
                    </div>
                    <div>
                        <h1 className="font-black text-2xl tracking-tight text-slate-900 group-hover:text-primary transition-colors duration-300">Talentley</h1>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="h-1 w-4 bg-primary rounded-full"></span>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] opacity-80">Admin Core</p>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 px-4 space-y-6 mt-8 overflow-y-auto custom-scrollbar pb-6">
                    {menuGroups.map((group, gIdx) => (
                        <div key={group.group} className="space-y-2">
                            <h3 className="px-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{group.group}</h3>
                            <div className="space-y-1">
                                {group.items.map((item) => {
                                    const isActive = pathname === item.path || pathname?.startsWith(item.path + '/');
                                    return (
                                        <Link
                                            key={item.name}
                                            href={item.path}
                                            className={`flex items-center gap-4 px-6 py-3.5 mx-2 rounded-[1rem] font-bold transition-all duration-300 relative group overflow-hidden ${isActive ? 'text-white shadow-xl shadow-primary/20 bg-primary' : 'text-slate-500 hover:text-primary hover:bg-slate-50'}`}
                                        >
                                            <item.icon size={20} className={`relative z-10 transition-transform duration-300 ${isActive ? 'text-white' : 'text-slate-400 group-hover:scale-110 group-hover:text-primary'}`} />
                                            <span className="text-[14px] relative z-10 tracking-tight">{item.name}</span>
                                            {isActive && (
                                                <motion.div
                                                    layoutId="nav-bg"
                                                    className="absolute inset-0 bg-gradient-to-r from-primary to-primary-light z-0"
                                                />
                                            )}
                                            {isActive && (
                                                <motion.div
                                                    initial={{ x: -10, opacity: 0 }}
                                                    animate={{ x: 0, opacity: 1 }}
                                                    className="absolute right-4 size-1.5 bg-white rounded-full z-10"
                                                />
                                            )}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </nav>

                <div className="p-8 mt-auto px-6">
                    <div className="bg-white/60 backdrop-blur-sm border border-white/50 rounded-[2rem] p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition-all duration-500 group">
                        <div className="size-12 rounded-2xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center font-black text-white shadow-lg group-hover:scale-110 transition-transform duration-500">
                            AJ
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-[14px] font-black truncate text-slate-900">Alex Johnson</p>
                            <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] opacity-80">Super Admin</p>
                        </div>
                        <button className="text-slate-300 hover:text-red-500 transition-all duration-500 hover:rotate-12 p-2">
                            <LogOut size={20} />
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 h-full overflow-y-auto relative z-10 scroll-smooth custom-scrollbar">
                {/* Header */}
                <header className="h-24 bg-white/40 backdrop-blur-3xl border-b border-white/40 flex items-center justify-between px-12 sticky top-0 z-40 transition-all duration-500">
                    <div className="flex items-center lg:hidden">
                        <button onClick={() => setIsSidebarOpen(true)} className="p-3 mr-4 bg-white/80 rounded-[1.25rem] border border-white/50 shadow-sm text-primary">
                            <Menu size={24} />
                        </button>
                    </div>
                    <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                            <div className="size-2 bg-green-500 rounded-full animate-pulse"></div>
                            <h2 className="text-2xl font-black tracking-tight text-slate-900 leading-none">ADMIN</h2>
                        </div>
                        <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mt-2 opacity-70">Mainframe Interface • Active Session</p>
                    </div>

                    <div className="flex items-center gap-10">
                        <div className="hidden xl:block relative w-[30rem] group">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-all duration-300" size={20} />
                            <input
                                type="text"
                                placeholder="Search everything..."
                                className="w-full pl-16 pr-8 py-4 bg-white/60 border border-white/50 rounded-[1.5rem] focus:ring-[15px] focus:ring-primary/5 focus:bg-white focus:border-primary/20 transition-all font-bold text-[15px] outline-none shadow-inner placeholder:text-slate-300"
                            />
                        </div>
                        <div className="flex items-center gap-4">
                            <button className="p-4 bg-white/60 text-slate-400 hover:text-primary hover:bg-white rounded-[1.25rem] relative transition-all duration-500 border border-white/50 shadow-sm group">
                                <Bell size={22} className="group-hover:rotate-12 transition-transform" />
                                <span className="absolute top-4 right-4 size-3 bg-primary rounded-full border-[3px] border-white shadow-xl ring-4 ring-primary/10"></span>
                            </button>
                            <button className="p-4 bg-slate-900 text-white rounded-[1.25rem] hover:bg-primary transition-all duration-500 shadow-xl shadow-slate-900/10">
                                <Settings size={22} />
                            </button>
                        </div>
                    </div>
                </header>

                <main className="p-12 flex-grow">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        {children}
                    </motion.div>

                    <footer className="mt-20 py-10 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6 opacity-60">
                        <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest leading-loose">
                            &copy; 2024 Talentley School Management System.<br />Built for Excellence in Education.
                        </p>
                        <div className="flex gap-8">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest cursor-pointer hover:text-primary transition-colors">Documentation</span>
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest cursor-pointer hover:text-primary transition-colors">Support Center</span>
                        </div>
                    </footer>
                </main>
            </div>
        </div>
    );
}
