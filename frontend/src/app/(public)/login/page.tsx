"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { User, Lock, ArrowRight, ShieldCheck, ChevronLeft } from 'lucide-react';
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
        <div className="min-h-screen bg-[#f7f9fb] text-[#191c1e] font-['Manrope'] antialiased flex flex-col">
            <main className="flex-grow flex items-start justify-center p-6 lg:pt-12 relative overflow-hidden">
                {/* Background Editorial Elements */}
                <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#ff6b2c]/10 rounded-full blur-[120px] -z-10 animate-pulse-slow"></div>
                <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-[#d5e0f8]/20 rounded-full blur-[100px] -z-10 animate-pulse-slow" style={{ animationDelay: '2s' }}></div>

                <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-16 items-start z-10">
                    {/* Left Side: Editorial Content */}
                    <div className="hidden lg:flex flex-col space-y-8 pr-12">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="space-y-4"
                        >
                            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#ff6b2c]/10 text-[#a83900] font-bold text-xs tracking-widest uppercase">
                                Unified Nexus • Excellence
                            </span>
                            <h1 className="text-8xl font-black tracking-tighter text-[#191c1e] leading-[0.95] mb-2">
                                Talentley <br />
                                <span className="text-[#ff6b2c]">Portal</span>
                            </h1>
                            <p className="text-2xl text-[#545f73] font-medium leading-relaxed max-w-xl">
                                A single gateway for both Scholars and Administrators to drive academic excellence.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="relative rounded-xl overflow-hidden shadow-[0px_12px_32px_rgba(25,28,30,0.06)] group"
                        >
                            <img
                                className="w-full h-64 object-cover transform transition-transform duration-700 group-hover:scale-105"
                                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop"
                                alt="Students studying"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#191c1e]/60 to-transparent flex items-end p-8">
                                <div className="text-white">
                                    <p className="text-sm font-medium opacity-80 uppercase tracking-widest mb-1">Mission Control</p>
                                    <p className="text-lg font-semibold italic">"Empowering the next generation of genius minds."</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Side: Login Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-stretch w-full"
                    >
                        <div className="w-full bg-white rounded-xl p-10 lg:p-12 shadow-[0px_12px_32px_rgba(25,28,30,0.06)] relative">
                            {/* Secure Badge */}
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-nowrap">
                                <div className="bg-[#191c1e] text-white px-4 py-2 rounded-full text-xs font-bold tracking-tight flex items-center gap-2 shadow-lg">
                                    <ShieldCheck className="w-4 h-4 text-white" />
                                    Talentley Secure Gateway
                                </div>
                            </div>

                            <div className="text-center mb-8 mt-2">
                                <h2 className="text-3xl font-black text-[#191c1e] tracking-tight mb-2">Portal Login</h2>
                                <p className="text-[#545f73] font-medium text-sm">Enter your credentials to access your dashboard.</p>
                            </div>

                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mb-8 p-4 bg-red-50 border border-red-100 text-red-600 rounded-lg text-sm font-bold text-center"
                                >
                                    {error}
                                </motion.div>
                            )}

                            <form className="space-y-6" onSubmit={handleSubmit}>
                                <div className="space-y-1.5">
                                    <label className="block text-[11px] font-bold text-[#545f73] uppercase tracking-wider ml-1">Username or Student ID</label>
                                    <div className="relative group">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#545f73]/50 w-5 h-5 group-focus-within/input:text-[#ff6b2c] transition-colors" />
                                        <input
                                            value={identifier}
                                            onChange={(e) => setIdentifier(e.target.value)}
                                            className="w-full pl-12 pr-4 py-4 bg-[#f2f4f6] border-0 rounded-lg text-[#191c1e] focus:ring-2 focus:ring-[#ff6b2c]/20 focus:bg-white transition-all placeholder:text-[#545f73]/40 font-bold"
                                            placeholder="e.g. admin or scholar.01"
                                            type="text"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <div className="flex justify-between items-center px-1">
                                        <label className="text-[11px] font-bold text-[#545f73] uppercase tracking-wider">Password</label>
                                        <button type="button" className="text-[11px] font-bold text-[#ff6b2c] hover:text-[#a83900] transition-colors uppercase tracking-wider">Trouble Logging In?</button>
                                    </div>
                                    <div className="relative group">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#545f73]/50 w-5 h-5 group-focus-within/input:text-[#ff6b2c] transition-colors" />
                                        <input
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full pl-12 pr-4 py-4 bg-[#f2f4f6] border-0 rounded-lg text-[#191c1e] focus:ring-2 focus:ring-[#ff6b2c]/20 focus:bg-white transition-all placeholder:text-[#545f73]/40 font-bold"
                                            placeholder="••••••••"
                                            type="password"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="pt-2">
                                    <button
                                        disabled={loading}
                                        className="w-full bg-[#ff6b2c] text-white font-extrabold py-5 rounded-xl text-lg shadow-lg shadow-[#ff6b2c]/20 hover:bg-[#a83900] transition-all transform active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50"
                                        type="submit"
                                    >
                                        {loading ? 'Authenticating...' : 'Sign In to Portal'}
                                        <ArrowRight className="w-5 h-5" />
                                    </button>
                                </div>
                            </form>

                            <div className="mt-10 pt-8 border-t border-[#e0e3e5] flex flex-col items-center gap-4">
                                <p className="text-[10px] font-bold text-[#545f73] uppercase tracking-widest opacity-60">System Security: Level 7 Active</p>
                            </div>
                        </div>

                        <div className="mt-8 flex items-center gap-6 opacity-40">
                            <Link href="/" className="flex items-center space-x-2 group hover:opacity-100 transition-opacity">
                                <ChevronLeft className="w-4 h-4 text-[#545f73] group-hover:-translate-x-1 transition-transform" />
                                <span className="text-xs font-bold text-[#545f73] uppercase tracking-widest">Back to Nexus</span>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </main>
        </div>
    );
}
