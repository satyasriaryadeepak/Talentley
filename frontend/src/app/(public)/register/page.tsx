"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { User, Lock, ArrowRight, ShieldCheck, Mail, UserPlus } from 'lucide-react';
import Link from 'next/link';

export default function StudentRegisterPage() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters.');
            return;
        }

        setLoading(true);

        try {
            const res = await fetch('http://localhost:5000/api/auth/student/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ studentId: email, name, password })
            });

            const data = await res.json();
            if (res.ok) {
                setSuccess('Account created successfully! Redirecting to login...');
                setTimeout(() => {
                    router.push('/login/student');
                }, 2000);
            } else {
                setError(data.message || 'Registration failed. Please try again.');
            }
        } catch (err) {
            setError('Connection error. Please ensure the backend is running.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#f7f9fb] text-[#191c1e] font-['Manrope'] antialiased flex flex-col">
            <main className="flex-grow flex items-center justify-center p-6 lg:pt-12 relative overflow-hidden">
                {/* Background Editorial Elements */}
                <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#ff6b2c]/10 rounded-full blur-[120px] -z-10 animate-pulse-slow"></div>
                <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-[#d5e0f8]/20 rounded-full blur-[100px] -z-10 animate-pulse-slow" style={{ animationDelay: '2s' }}></div>

                <div className="w-full max-w-xl z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-stretch w-full"
                    >
                        <div className="w-full bg-white rounded-xl p-10 lg:p-12 shadow-[0px_12px_32px_rgba(25,28,30,0.06)] relative">
                            {/* Secure Badge */}
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-nowrap">
                                <div className="bg-[#191c1e] text-white px-4 py-2 rounded-full text-xs font-bold tracking-tight flex items-center gap-2 shadow-lg">
                                    <UserPlus className="w-4 h-4 text-white" />
                                    Student Registration
                                </div>
                            </div>

                            <div className="text-center mb-8 mt-2">
                                <h2 className="text-3xl font-black text-[#191c1e] tracking-tight mb-2">Create Account</h2>
                                <p className="text-[#545f73] font-medium text-sm">Join the Talentley community today.</p>
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

                            {success && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mb-8 p-4 bg-green-50 border border-green-100 text-green-600 rounded-lg text-sm font-bold text-center"
                                >
                                    {success}
                                </motion.div>
                            )}

                            <form className="space-y-6" onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-1.5 md:col-span-2">
                                        <label className="block text-[11px] font-bold text-[#545f73] uppercase tracking-wider ml-1">Full Name</label>
                                        <div className="relative group">
                                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#545f73]/50 w-5 h-5 group-focus-within:text-[#ff6b2c] transition-colors" />
                                            <input
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                className="w-full pl-12 pr-4 py-4 bg-[#f2f4f6] border-0 rounded-lg text-[#191c1e] focus:ring-2 focus:ring-[#ff6b2c]/20 focus:bg-white transition-all placeholder:text-[#545f73]/40"
                                                placeholder="Enter your full name"
                                                type="text"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1.5 md:col-span-2">
                                        <label className="block text-[11px] font-bold text-[#545f73] uppercase tracking-wider ml-1">Email Address</label>
                                        <div className="relative group">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#545f73]/50 w-5 h-5 group-focus-within:text-[#ff6b2c] transition-colors" />
                                            <input
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="w-full pl-12 pr-4 py-4 bg-[#f2f4f6] border-0 rounded-lg text-[#191c1e] focus:ring-2 focus:ring-[#ff6b2c]/20 focus:bg-white transition-all placeholder:text-[#545f73]/40"
                                                placeholder="e.g. name@example.com"
                                                type="email"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="block text-[11px] font-bold text-[#545f73] uppercase tracking-wider ml-1">Password</label>
                                        <div className="relative group">
                                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#545f73]/50 w-5 h-5 group-focus-within:text-[#ff6b2c] transition-colors" />
                                            <input
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                className="w-full pl-12 pr-4 py-4 bg-[#f2f4f6] border-0 rounded-lg text-[#191c1e] focus:ring-2 focus:ring-[#ff6b2c]/20 focus:bg-white transition-all placeholder:text-[#545f73]/40"
                                                placeholder="••••••••"
                                                type="password"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="block text-[11px] font-bold text-[#545f73] uppercase tracking-wider ml-1">Confirm Password</label>
                                        <div className="relative group">
                                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#545f73]/50 w-5 h-5 group-focus-within:text-[#ff6b2c] transition-colors" />
                                            <input
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                className="w-full pl-12 pr-4 py-4 bg-[#f2f4f6] border-0 rounded-lg text-[#191c1e] focus:ring-2 focus:ring-[#ff6b2c]/20 focus:bg-white transition-all placeholder:text-[#545f73]/40"
                                                placeholder="••••••••"
                                                type="password"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-2">
                                    <button
                                        disabled={loading}
                                        className="w-full bg-[#ff6b2c] text-white font-extrabold py-5 rounded-xl text-lg shadow-lg shadow-[#ff6b2c]/20 hover:bg-[#a83900] transition-all transform active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50"
                                        type="submit"
                                    >
                                        {loading ? 'Creating Account...' : 'Register Now'}
                                        <ArrowRight className="w-5 h-5" />
                                    </button>
                                </div>
                            </form>

                            <div className="mt-10 pt-8 border-t border-[#e0e3e5] flex flex-col items-center gap-4">
                                <p className="text-sm text-[#545f73] font-medium">Already have an account?</p>
                                <Link href="/login/student" className="w-full">
                                    <button className="w-full border-2 border-[#e0e3e5] text-[#191c1e] font-bold py-4 rounded-xl hover:bg-[#f2f4f6] transition-colors">
                                        Sign In
                                    </button>
                                </Link>
                            </div>
                        </div>

                        <div className="mt-8 flex items-center justify-center gap-6 opacity-40">
                            <div className="flex items-center space-x-2">
                                <ShieldCheck className="w-8 h-8 text-[#545f73]" />
                                <span className="text-xs font-bold text-[#545f73] uppercase tracking-widest text-center">Talentley Academic Network</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </main>
        </div>
    );
}
