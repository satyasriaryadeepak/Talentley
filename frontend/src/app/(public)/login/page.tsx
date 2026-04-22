"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { User, Lock, ArrowRight, ShieldCheck, ChevronLeft, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function UnifiedLoginPage() {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ identifier, password })
            });

            const data = await res.json();
            if (res.ok) {
                // Store based on role
                if (data.user.role === 'admin') {
                    localStorage.setItem('adminToken', data.token);
                    localStorage.setItem('adminUser', JSON.stringify(data.user));
                } else {
                    localStorage.setItem('studentToken', data.token);
                    localStorage.setItem('studentUser', JSON.stringify(data.user));
                }
                
                // Redirect to the dashboard provided by backend
                router.push(data.redirect);
            } else {
                setError(data.message || 'Invalid credentials');
            }
        } catch (err) {
            setError('Connection error. Please ensure the backend is running.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#f7f9fb] text-[#191c1e] font-sans antialiased flex flex-col">
            <main className="flex-grow flex items-center justify-center p-6 relative overflow-hidden">
                {/* Background Editorial Elements */}
                <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#ff6b2c]/10 rounded-full blur-[120px] -z-10 animate-pulse-slow"></div>
                <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-[#6366f1]/10 rounded-full blur-[100px] -z-10 animate-pulse-slow" style={{ animationDelay: '2s' }}></div>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-md relative z-10"
                >
                    <div className="bg-white rounded-3xl p-10 lg:p-12 shadow-[0px_12px_32px_rgba(25,28,30,0.06)] border border-slate-100 relative group">
                        {/* Branding */}
                        <div className="text-center mb-10">
                            <motion.div 
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                                className="size-20 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-6"
                            >
                                <ShieldCheck className="w-10 h-10" />
                            </motion.div>
                            <h2 className="text-4xl font-black text-[#191c1e] tracking-tight mb-2">Talentley Login</h2>
                            <p className="text-slate-500 font-bold text-sm tracking-tight opacity-70 uppercase accent-primary">Enter your credentials to access your portal</p>
                        </div>

                        {error && (
                            <motion.div 
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="mb-8 p-4 bg-red-50 border border-red-100 text-red-500 rounded-xl text-xs font-black text-center uppercase tracking-widest"
                            >
                                {error}
                            </motion.div>
                        )}

                        <form className="space-y-8" onSubmit={handleSubmit}>
                            <div className="space-y-2">
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] ml-1">Username or Student ID</label>
                                <div className="relative group/input">
                                    <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within/input:text-primary transition-colors" />
                                    <input 
                                        type="text"
                                        value={identifier}
                                        onChange={(e) => setIdentifier(e.target.value)}
                                        className="w-full pl-14 pr-6 py-5 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 font-bold outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary/50 transition-all placeholder:text-slate-300 shadow-inner"
                                        placeholder="e.g. admin or scholar.01"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-center px-1">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em]">Password</label>
                                    <button type="button" className="text-[10px] font-black text-primary hover:text-primary-dark transition-colors uppercase tracking-[0.2em] italic opacity-70">Trouble accessing?</button>
                                </div>
                                <div className="relative group/input">
                                    <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within/input:text-primary transition-colors" />
                                    <input 
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full pl-14 pr-6 py-5 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 font-bold outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary/50 transition-all placeholder:text-slate-300 shadow-inner"
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full premium-gradient text-white font-black py-6 rounded-2xl text-lg shadow-2xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:hover:scale-100 group"
                            >
                                <span>{loading ? 'Authenticating...' : 'Sign In to Portal'}</span>
                                {!loading && <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />}
                            </button>
                        </form>

                        <div className="mt-12 pt-8 border-t border-slate-100 text-center">
                            <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest leading-loose">
                                Protected by Talentley Encryption Nexus & Biometric Protocols
                            </p>
                        </div>
                    </div>

                    <div className="mt-8 flex justify-center">
                        <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-primary font-black text-[10px] uppercase tracking-[0.3em] transition-colors group">
                            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            Back to Landing
                        </Link>
                    </div>
                </motion.div>
            </main>
        </div>
    );
}
