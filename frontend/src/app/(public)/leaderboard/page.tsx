"use client";
import { motion } from 'framer-motion';
import { Trophy, Star, Search, Filter, ArrowUpRight, Sparkles } from 'lucide-react';

export default function LeaderboardPage() {
    const topRankers = [
        { rank: 2, name: 'Arjun Mehta', score: '984', class: 'Class 10', image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=200&auto=format&fit=crop' },
        { rank: 1, name: 'Sarah Williams', score: '992', class: 'Class 10', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop' },
        { rank: 3, name: 'Rahul Khanna', score: '976', class: 'Class 10', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop' },
    ];

    const rankings = [
        { rank: 4, name: 'Priya Joshi', score: '965', class: 'Class 10' },
        { rank: 5, name: 'Kevin Peterson', score: '958', class: 'Class 10' },
        { rank: 6, name: 'Ananya Ray', score: '952', class: 'Class 9' },
        { rank: 7, name: 'David Miller', score: '945', class: 'Class 10' },
        { rank: 8, name: 'Sanya Gupta', score: '938', class: 'Class 8' },
    ];

    return (
        <div className="min-h-screen pt-32 pb-20 bg-[#fbfdff] relative overflow-hidden selection:bg-primary/10">
            {/* Background Decorations */}
            <div className="blob top-0 left-0 animate-pulse-slow"></div>
            <div className="blob bottom-0 right-0 bg-secondary/5 animate-pulse-slow" style={{ animationDelay: '2s' }}></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center space-x-2 py-2 px-4 rounded-full bg-blue-50 border border-blue-100 text-primary font-bold text-xs mb-6"
                    >
                        <Trophy className="w-4 h-4" />
                        <span>GLOBAL PERFORMANCE RANKINGS</span>
                    </motion.div>
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-6xl font-black text-slate-900 mb-6 tracking-tight"
                    >
                        The <span className="text-gradient">Champions</span> Circle
                    </motion.h1>
                    <p className="text-slate-500 text-xl font-medium leading-relaxed">Celebrating excellence and academic brilliance across all classes nationwide.</p>
                </div>

                {/* Top 3 Podium */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32 items-end max-w-5xl mx-auto px-4">
                    {topRankers.map((ranker, idx) => (
                        <motion.div 
                            key={ranker.rank}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.2, duration: 0.8 }}
                            className={`relative group ${ranker.rank === 1 ? 'md:-translate-y-12 order-1 md:order-2' : ranker.rank === 2 ? 'order-2 md:order-1' : 'order-3'}`}
                        >
                            <div className={`glass-card rounded-[3rem] p-8 text-center transition-all duration-500 group-hover:shadow-[0_40px_80px_rgba(59,130,246,0.15)] border-white relative overflow-hidden ${ranker.rank === 1 ? 'ring-4 ring-primary ring-offset-8 scale-110 shadow-3xl bg-white' : ''}`}>
                                {ranker.rank === 1 && <div className="absolute top-0 left-0 w-full h-2 premium-gradient"></div>}
                                
                                <div className="relative inline-block mb-6">
                                    <div className={`w-36 h-36 rounded-[2.5rem] overflow-hidden ring-4 shadow-2xl transition-transform duration-700 group-hover:scale-105 ${ranker.rank === 1 ? 'ring-yellow-400' : ranker.rank === 2 ? 'ring-slate-300' : 'ring-secondary'}`}>
                                        <img src={ranker.image} alt={ranker.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className={`absolute -bottom-4 -right-4 w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-xl animate-float ${ranker.rank === 1 ? 'bg-yellow-400' : ranker.rank === 2 ? 'bg-slate-300' : 'bg-secondary'}`}>
                                        {ranker.rank === 1 ? '1' : ranker.rank === 2 ? '2' : '3'}
                                    </div>
                                </div>

                                <h3 className="text-2xl font-black text-slate-900 mb-1">{ranker.name}</h3>
                                <p className="text-slate-500 font-bold text-xs uppercase tracking-widest mb-6">{ranker.class}</p>
                                
                                <div className="bg-slate-50 rounded-2xl p-4 flex justify-between items-center group-hover:bg-primary transition-all duration-500">
                                    <span className="text-slate-500 font-bold group-hover:text-white/70">Points Scored</span>
                                    <span className="text-primary font-black text-xl group-hover:text-white">{ranker.score}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* All Rankings Table */}
                <div className="glass-card rounded-[3rem] overflow-hidden border-white bg-white/40 shadow-2xl">
                    <div className="p-10 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="flex items-center space-x-4">
                           <Trophy className="text-primary w-8 h-8" />
                           <h2 className="text-3xl font-black text-slate-900">National Rankings</h2>
                        </div>
                        <div className="flex space-x-4">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                                <input type="text" placeholder="Search student..." className="pl-12 pr-6 py-4 bg-white rounded-2xl border border-slate-100 outline-none focus:ring-2 focus:ring-primary/20 w-full md:w-64 font-bold shadow-sm" />
                            </div>
                            <button className="bg-white p-4 rounded-2xl border border-slate-100 hover:bg-slate-50 transition-all shadow-sm group">
                                <Filter className="text-slate-600 group-hover:text-primary transition-colors" />
                            </button>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-slate-50/50 text-slate-400 font-black text-xs uppercase tracking-widest">
                                    <th className="px-10 py-6">Rank</th>
                                    <th className="px-10 py-6">Student Name</th>
                                    <th className="px-10 py-6">Class</th>
                                    <th className="px-10 py-6">Total Score</th>
                                    <th className="px-10 py-6 text-right">Certificate</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {rankings.map((student) => (
                                    <tr key={student.rank} className="hover:bg-blue-50/30 transition-colors group">
                                        <td className="px-10 py-8">
                                            <span className="text-2xl font-black text-slate-300 group-hover:text-primary transition-colors duration-300">#{student.rank}</span>
                                        </td>
                                        <td className="px-10 py-8">
                                            <div className="flex items-center space-x-4 text-left">
                                                <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center font-black text-slate-400 group-hover:bg-primary group-hover:text-white transition-all transform group-hover:rotate-6">
                                                    {student.name.charAt(0)}
                                                </div>
                                                <span className="font-black text-slate-900 text-lg">{student.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-10 py-8">
                                            <span className="font-bold text-slate-500 bg-slate-100 group-hover:bg-blue-100 px-4 py-2 rounded-xl text-sm transition-colors">{student.class}</span>
                                        </td>
                                        <td className="px-10 py-8">
                                            <span className="font-black text-slate-900 text-xl group-hover:text-primary transition-colors">{student.score}</span>
                                        </td>
                                        <td className="px-10 py-8 text-right">
                                            <button className="text-primary font-black flex items-center justify-end space-x-2 ml-auto hover:translate-x-1 transition-transform group/btn">
                                                <span>View Accomplishments</span>
                                                <ArrowUpRight className="w-5 h-5 group-hover/btn:-translate-y-1 transition-transform" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="p-10 text-center bg-slate-50/30">
                        <motion.button 
                           whileHover={{ scale: 1.05 }}
                           whileTap={{ scale: 0.95 }}
                           className="text-slate-400 font-extrabold hover:text-primary tracking-widest text-sm transition-colors uppercase flex items-center justify-center mx-auto space-x-2"
                        >
                           <span>Load More Performers</span>
                           <Sparkles className="w-4 h-4" />
                        </motion.button>
                    </div>
                </div>
            </div>
        </div>
    );
}
