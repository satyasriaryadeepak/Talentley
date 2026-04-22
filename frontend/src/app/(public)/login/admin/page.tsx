"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Shield, Lock, User, ArrowRight, ChevronLeft, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function AdminLoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('http://localhost:5000/api/auth/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            const data = await res.json();
            if (res.ok) {
                localStorage.setItem('adminToken', data.token);
                localStorage.setItem('adminUser', JSON.stringify(data.user));
                router.push('/admin/dashboard');
            } else {
                setError(data.message || 'Authentication failed');
            }
        } catch (err) {
            setError('Connection error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-6 relative overflow-hidden font-sans">
            {/* Animated Vibrant Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div 
                    animate={{ 
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 0],
                        translate: [0, 100, 0]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-[20%] -left-[20%] w-[80%] h-[80%] bg-primary/20 rounded-full blur-[120px]"
                />
                <motion.div 
                    animate={{ 
                        scale: [1, 1.3, 1],
                        rotate: [0, -90, 0],
                        translate: [0, -100, 0]
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute -bottom-[20%] -right-[20%] w-[80%] h-[80%] bg-secondary/10 rounded-full blur-[120px]"
                />
            </div>

            <div className="absolute top-10 left-10 z-20">
                <Link href="/" className="flex items-center space-x-3 text-slate-400 hover:text-white transition-all group font-black text-[10px] uppercase tracking-[0.3em]">
                    <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    <span>Return to Nexus</span>
                </Link>
            </div>

            <motion.div 
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-xl relative z-10"
            >
                <div className="bg-white/5 backdrop-blur-3xl rounded-[4rem] p-16 border border-white/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden relative group">
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 p-12 opacity-5 rotate-12 group-hover:opacity-20 transition-all duration-1000">
                        <Shield size={180} className="text-primary" />
                    </div>
                    <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>

                    <div className="text-center mb-16">
                        <motion.div 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                            className="size-24 premium-gradient rounded-[2rem] flex items-center justify-center text-white shadow-[0_20px_40px_-10px_rgba(236,91,19,0.5)] mx-auto mb-10 relative"
                        >
                            <Shield size={44} />
                            <Sparkles className="absolute -top-2 -right-2 text-white animate-pulse" size={24} />
                        </motion.div>
                        <h1 className="text-5xl font-black text-white mb-4 tracking-tighter leading-none">
                            Admin <span className="text-primary">Portal</span>
                        </h1>
                        <p className="text-slate-400 font-bold text-sm uppercase tracking-[0.2em] opacity-80">Level 7 Authentication Required</p>
                    </div>

                    {error && (
                        <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="mb-10 p-5 bg-rose-500/10 border border-rose-500/20 rounded-2xl text-rose-500 text-center font-black text-xs uppercase tracking-widest"
                        >
                            {error}
                        </motion.div>
                    )}

                    <form className="space-y-10" onSubmit={handleSubmit}>
                        <div className="space-y-6">
                            <div className="relative group">
                                <User className="absolute left-8 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors duration-300" size={20} />
                                <input 
                                    type="text" 
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="COMMANDER ID" 
                                    className="w-full bg-white/5 border border-white/10 rounded-[2rem] pl-20 pr-10 py-7 text-white outline-none focus:ring-[15px] focus:ring-primary/10 focus:border-primary/50 transition-all font-black text-xs uppercase tracking-[0.2em] placeholder:text-slate-600 shadow-inner" 
                                    required
                                />
                            </div>
                            <div className="relative group">
                                <Lock className="absolute left-8 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors duration-300" size={20} />
                                <input 
                                    type="password" 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="CIPHER KEY" 
                                    className="w-full bg-white/5 border border-white/10 rounded-[2rem] pl-20 pr-10 py-7 text-white outline-none focus:ring-[15px] focus:ring-primary/10 focus:border-primary/50 transition-all font-black text-xs uppercase tracking-[0.2em] placeholder:text-slate-600 shadow-inner" 
                                    required
                                />
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            disabled={loading}
                            className="w-full py-7 bg-slate-100 text-slate-900 rounded-[2.5rem] font-black text-xs uppercase tracking-[0.3em] shadow-2xl flex items-center justify-center gap-4 group hover:bg-primary hover:text-white hover:scale-[1.02] transition-all duration-700 disabled:opacity-50 disabled:hover:scale-100"
                        >
                            <span>{loading ? 'Decrypting...' : 'Initiate Access'}</span>
                            {!loading && <ArrowRight size={22} className="group-hover:translate-x-2 transition-transform duration-500" />}
                        </button>
                    </form>

                    <div className="mt-16 pt-8 border-t border-white/5 text-center">
                        <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] max-w-[80%] mx-auto leading-loose italic">
                            Protected by Talentley Biometrics & Quantum Encryption Nexus
                        </p>
                    </div>
                </div>

                <div className="mt-12 flex justify-center items-center gap-4 text-slate-500 font-black text-[9px] uppercase tracking-[0.4em] opacity-40">
                    <span>Talentley HQ</span>
                    <div className="size-1 bg-slate-700 rounded-full"></div>
                    <span>Cluster 07-N</span>
                </div>
            </motion.div>
        </div>
    );
}
