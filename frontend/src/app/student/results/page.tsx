"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { 
    Trophy, 
    CheckCircle2, 
    XCircle, 
    FileText, 
    TrendingUp, 
    Zap, 
    Clock, 
    ChevronRight,
    Sparkles
} from 'lucide-react';

export default function StudentResultsPage() {
    const results = [
        { id: 1, exam: 'Physics Olympiad', score: '92/100', rank: '#42', status: 'Passed', date: '12 March 2026', performance: 'Excellent' },
        { id: 2, exam: 'Mathematics Championship', score: '98/100', rank: '#8', status: 'Passed', date: '10 March 2026', performance: 'Outstanding' },
        { id: 3, exam: 'Chemistry Mastery', score: '74/100', rank: '#210', status: 'Passed', date: '05 March 2026', performance: 'Good' },
    ];

    return (
        <div className="space-y-12 pb-20">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight flex items-center">
                        Your Achievements <Sparkles className="ml-3 text-secondary animate-pulse" />
                    </h1>
                    <p className="text-slate-400 font-bold text-lg mt-2 tracking-tight">Analytical breakdown of your assessment performances.</p>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    { label: 'Overall Percentile', value: '96.4%', icon: TrendingUp, color: 'primary' },
                    { label: 'Certificates Earned', value: '08', icon: Trophy, color: 'secondary' },
                    { label: 'Average Prep Time', value: '14h/wk', icon: Clock, color: 'indigo' }
                ].map((stat, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="bento-card border-white shadow-xl"
                    >
                         <div className="flex items-center space-x-4">
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg ${
                                stat.color === 'primary' ? 'bg-primary' : stat.color === 'secondary' ? 'bg-secondary' : 'bg-indigo-600'
                            }`}>
                                <stat.icon size={26} />
                            </div>
                            <div>
                                <h3 className="text-3xl font-black text-slate-900 tracking-tighter">{stat.value}</h3>
                                <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">{stat.label}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="bg-white rounded-[3.5rem] border border-slate-100 shadow-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50/50 text-slate-400 font-black text-xs uppercase tracking-widest">
                                <th className="px-10 py-6">Exam Information</th>
                                <th className="px-10 py-6">Score & Rank</th>
                                <th className="px-10 py-6">Performance</th>
                                <th className="px-10 py-6">Status</th>
                                <th className="px-10 py-6 text-right">Details</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {results.map((result) => (
                                <tr key={result.id} className="hover:bg-blue-50/30 transition-colors group">
                                    <td className="px-10 py-8">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center text-primary shadow-sm border border-white">
                                                <FileText size={24} />
                                            </div>
                                            <div>
                                                <div className="font-black text-slate-900 text-lg leading-none mb-1">{result.exam}</div>
                                                <div className="text-sm font-bold text-slate-400">{result.date}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-10 py-8">
                                        <div className="flex items-center space-x-3">
                                            <div className="text-xl font-black text-slate-900 leading-none">{result.score}</div>
                                            <div className="px-3 py-1 bg-primary/10 text-primary rounded-lg text-xs font-black">{result.rank}</div>
                                        </div>
                                    </td>
                                    <td className="px-10 py-8">
                                        <div className="flex items-center space-x-2">
                                             <div className="h-2 w-24 bg-slate-100 rounded-full overflow-hidden">
                                                <div className="h-full bg-secondary" style={{ width: result.performance === 'Outstanding' ? '100%' : '80%' }}></div>
                                             </div>
                                             <span className="text-sm font-bold text-slate-600">{result.performance}</span>
                                        </div>
                                    </td>
                                    <td className="px-10 py-8">
                                        <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest bg-green-100 text-green-600">
                                            <CheckCircle2 size={12} className="mr-1.5" />
                                            {result.status}
                                        </span>
                                    </td>
                                    <td className="px-10 py-8 text-right">
                                        <button className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition-all ml-auto shadow-sm">
                                            <ChevronRight size={20} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                 <div className="p-10 bg-slate-900 rounded-[3.5rem] text-white relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity rotate-12">
                        <Trophy size={120} />
                    </div>
                    <h3 className="text-2xl font-black mb-4 tracking-tight relative z-10">Leaderboard Position</h3>
                    <p className="text-slate-400 font-medium mb-8 leading-relaxed relative z-10">You're currently in the <span className="text-secondary font-black">Top 2%</span> of all Class 10 students. Keep it up!</p>
                    <button className="bg-white text-slate-900 px-8 py-4 rounded-2xl font-black hover:scale-105 transition-transform flex items-center space-x-2 relative z-10 shadow-xl">
                        <span>View Global Rank</span>
                        <ChevronRight size={18} />
                    </button>
                 </div>

                 <div className="p-10 bg-white border border-slate-100 rounded-[3.5rem] shadow-xl flex flex-col items-center justify-center text-center">
                    <div className="w-20 h-20 bg-secondary/10 rounded-3xl flex items-center justify-center text-secondary mb-6">
                        <Zap size={40} />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 mb-2 tracking-tight">Download Report Card</h3>
                    <p className="text-slate-400 font-bold mb-8">Get a detailed PDF breakdown of all your session performances.</p>
                    <button className="w-full py-4 premium-gradient text-white rounded-2xl font-black shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform flex items-center justify-center space-x-2">
                        <span>Download PDF</span>
                    </button>
                 </div>
            </div>
        </div>
    );
}
