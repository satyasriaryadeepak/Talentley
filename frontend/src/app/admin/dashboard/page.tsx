"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
    Users, 
    BookOpen, 
    Trophy, 
    ArrowUpRight, 
    ArrowDownRight, 
    TrendingUp, 
    Activity, 
    Calendar,
    Sparkles,
    UserPlus,
    Edit3,
    Trash2,
    Image as ImageIcon,
    Paperclip,
    Smile,
    Megaphone,
    Plus
} from 'lucide-react';

export default function AdminDashboard() {
    const [statsData, setStatsData] = useState({ students: '12,450', exams: '842', results: '15', awards: '128' });
    const [exams, setExams] = useState<any[]>([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/stats/landing')
            .then(res => res.json())
            .then(data => setStatsData({ students: data.students.toString(), exams: data.exams.toString(), results: '15', awards: data.awards.toString() }))
            .catch(console.error);
        
        fetch('http://localhost:5000/api/exams')
            .then(res => res.json())
            .then(data => {
                if (data && data.length > 0) {
                    // Show only the 3 most recent or top exams
                    setExams(data.slice(0, 3));
                } else {
                    // Default fallback
                    setExams([
                        { title: 'Mathematics Mid-Term', Class: { name: 'Class 8-A' }, examDate: new Date(), published: true, color: 'orange' },
                        { title: 'Physics Finals', Class: { name: 'Class 10-C' }, examDate: new Date(), published: false, color: 'indigo' },
                        { title: 'Olympiad Stage 1', Class: { name: 'Class 5-10' }, examDate: new Date(), published: false, color: 'slate' },
                    ]);
                }
            })
            .catch(console.error);
    }, []);

    const stats = [
        { title: 'Total Students', value: statsData.students, change: '+12.5%', type: 'up', icon: Users, color: 'orange' },
        { title: 'Exams Conducted', value: statsData.exams, change: '+5.2%', type: 'up', icon: BookOpen, color: 'indigo' },
        { title: 'Pending Results', value: statsData.results, change: 'Stable', type: 'stable', icon: Activity, color: 'rose' },
        { title: 'Prizes Awarded', value: statsData.awards, change: '+18.0%', type: 'up', icon: Trophy, color: 'amber' },
    ];

    const students = [
        { name: 'Sarah Williams', id: 'TL-2023-0451', class: 'Class 10', date: 'Aug 15, 2023' },
        { name: 'Michael Chen', id: 'TL-2023-0482', class: 'Class 10', date: 'Aug 18, 2023' },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" as any } }
    };

    return (
        <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-12 pb-20 pt-6"
        >
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                {stats.map((stat, i) => (
                    <motion.div 
                        key={i}
                        variants={itemVariants}
                        className="bg-white/40 backdrop-blur-3xl p-10 rounded-[2.5rem] border border-white/50 shadow-sm hover:shadow-2xl hover:shadow-primary/20 transition-all duration-700 group relative overflow-hidden active:scale-95"
                    >
                        {/* Background Glow */}
                        <div className={`absolute -top-24 -right-24 size-48 blur-[80px] opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none ${
                            stat.color === 'orange' ? 'bg-primary' : 
                            stat.color === 'indigo' ? 'bg-indigo-500' : 
                            stat.color === 'rose' ? 'bg-rose-500' : 'bg-amber-500'
                        }`} />

                        <div className="flex items-center justify-between mb-10 relative z-10">
                            <div className={`size-16 rounded-2xl flex items-center justify-center transition-all duration-700 shadow-lg ring-4 ring-white/50 group-hover:rotate-12 ${
                                stat.color === 'orange' ? 'bg-primary text-white shadow-primary/30' : 
                                stat.color === 'indigo' ? 'bg-indigo-500 text-white shadow-indigo-500/30' : 
                                stat.color === 'rose' ? 'bg-rose-500 text-white shadow-rose-500/30' : 'bg-amber-500 text-white shadow-amber-500/30'
                            }`}>
                                <stat.icon size={28} />
                            </div>
                            <div className={`text-[10px] font-black px-4 py-2 rounded-full border transition-all duration-700 shadow-sm flex items-center gap-1.5 ${
                                stat.type === 'up' ? 'text-green-600 bg-white/80 border-green-100 shadow-green-100/20' : 'text-slate-400 bg-white/80 border-slate-100'
                            }`}>
                                {stat.type === 'up' ? <TrendingUp size={12} /> : null}
                                {stat.change}
                            </div>
                        </div>
                        
                        <h3 className="text-4xl font-black text-slate-900 tracking-tight relative z-10 tabular-nums mb-2">
                            {stat.value}
                        </h3>
                        <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.25em] relative z-10 opacity-70 group-hover:text-slate-600 transition-colors">{stat.title}</p>

                        <div className="mt-10 h-1.5 w-full bg-slate-100/50 rounded-full overflow-hidden relative z-10 shadow-inner">
                            <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: '75%' }}
                                transition={{ delay: 0.8 + (i * 0.1), duration: 1.5, ease: "anticipate" }}
                                className={`h-full rounded-full ${
                                    stat.color === 'orange' ? 'bg-primary shadow-[0_0_15px_rgba(236,91,19,0.5)]' : 
                                    stat.color === 'indigo' ? 'bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.5)]' : 
                                    stat.color === 'rose' ? 'bg-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.5)]' : 'bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.5)]'
                                }`} 
                            />
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Manage Students Section */}
            <motion.div 
                variants={itemVariants}
                className="bg-white/40 backdrop-blur-3xl rounded-[3rem] border border-white/50 shadow-xl shadow-slate-200/20 overflow-hidden"
            >
                <div className="p-12 border-b border-white/40 flex flex-col md:flex-row md:items-center justify-between gap-10">
                    <div>
                        <h3 className="text-3xl font-black text-slate-900 tracking-tighter">Active Registrations</h3>
                        <div className="flex items-center gap-3 mt-3">
                            <span className="size-2 bg-primary rounded-full animate-ping"></span>
                            <p className="text-[11px] text-slate-400 font-black uppercase tracking-[0.25em] opacity-80">Synced with Mainframe • 1.2ms latency</p>
                        </div>
                    </div>
                    <button className="flex items-center justify-center gap-4 bg-slate-900 text-white px-10 py-5 rounded-[1.5rem] font-black text-xs uppercase tracking-[0.25em] hover:bg-primary shadow-2xl shadow-slate-900/10 hover:shadow-primary/30 transition-all duration-500 active:scale-95 group">
                        <UserPlus size={20} className="group-hover:rotate-12 transition-transform" />
                        <span>Enrol Student</span>
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50/20 text-slate-400 uppercase font-black tracking-[0.3em] text-[10px]">
                            <tr>
                                <th className="px-12 py-8">Candidate Profile</th>
                                <th className="px-12 py-8">Access Token</th>
                                <th className="px-12 py-8">Placement</th>
                                <th className="px-12 py-8">Entry Log</th>
                                <th className="px-12 py-8 text-right">Operations</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/20">
                            {students.map((student, i) => (
                                <tr key={i} className="hover:bg-white/60 transition-all duration-500 group cursor-default">
                                    <td className="px-12 py-10">
                                        <div className="flex items-center gap-6">
                                            <div className="size-16 rounded-[1.5rem] bg-white shadow-2xl shadow-slate-200/50 border border-slate-50 flex items-center justify-center text-primary font-black text-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:bg-primary group-hover:text-white">
                                                {student.name.charAt(0)}
                                            </div>
                                            <div>
                                                <span className="font-black text-slate-900 text-xl block leading-none mb-2 group-hover:text-primary transition-colors">{student.name}</span>
                                                <div className="flex items-center gap-2">
                                                    <div className="size-1.5 bg-green-500 rounded-full"></div>
                                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest opacity-80">Active Session</span>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-12 py-10">
                                        <span className="font-mono text-[11px] font-black bg-white/80 px-4 py-2 rounded-xl border border-slate-100 text-slate-600 shadow-inner group-hover:border-primary/20 transition-all">{student.id}</span>
                                    </td>
                                    <td className="px-12 py-10">
                                        <div className="font-black text-slate-900 text-lg">{student.class}</div>
                                        <p className="text-[9px] font-black text-slate-400 uppercase mt-1">Science Division</p>
                                    </td>
                                    <td className="px-12 py-10 text-slate-400 font-black text-xs uppercase tracking-tight">{student.date}</td>
                                    <td className="px-12 py-10 text-right">
                                        <div className="flex justify-end gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <button className="size-12 flex items-center justify-center text-slate-400 hover:text-primary hover:bg-white rounded-2xl transition-all duration-300 shadow-sm border border-transparent hover:border-slate-100"><Edit3 size={20} /></button>
                                            <button className="size-12 flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-white rounded-2xl transition-all duration-300 shadow-sm border border-transparent hover:border-slate-100"><Trash2 size={20} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Announcements Section */}
                <div className="lg:col-span-1 space-y-12">
                    <motion.div 
                        variants={itemVariants}
                        className="bg-white/40 backdrop-blur-3xl p-12 rounded-[3rem] border border-white/50 shadow-xl shadow-slate-200/20"
                    >
                        <h3 className="text-2xl font-black mb-10 text-slate-900 tracking-tight">Mainframe Memo</h3>
                        <div className="space-y-10">
                            <textarea 
                                className="w-full p-10 rounded-[2.5rem] bg-white border border-slate-100 focus:ring-[15px] focus:ring-primary/5 focus:border-primary/20 outline-none text-[15px] min-h-[220px] font-bold text-slate-900 transition-all placeholder:text-slate-300 shadow-inner" 
                                placeholder="Type a broadcast message..."
                            ></textarea>
                            <div className="flex items-center justify-between">
                                <div className="flex gap-3 text-slate-400">
                                    <button className="p-4 bg-white rounded-2xl hover:text-primary hover:shadow-lg transition-all duration-300 border border-slate-100"><ImageIcon size={22} /></button>
                                    <button className="p-4 bg-white rounded-2xl hover:text-primary hover:shadow-lg transition-all duration-300 border border-slate-100"><Paperclip size={22} /></button>
                                </div>
                                <button className="bg-primary text-white px-10 py-5 rounded-[1.5rem] font-black text-xs uppercase tracking-[0.25em] hover:bg-primary-dark transition-all duration-500 active:scale-95 shadow-xl shadow-primary/20">
                                    Broadcast
                                </button>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div 
                        variants={itemVariants}
                        className="bg-white/40 backdrop-blur-3xl p-12 rounded-[3rem] border border-white/50 shadow-xl shadow-slate-200/20"
                    >
                        <h3 className="text-2xl font-black mb-12 text-slate-900 tracking-tight">System Pulse</h3>
                        <div className="space-y-10">
                            {[
                                { text: 'Academic schedule updated for Finals.', time: 'System • 2h ago', icon: Megaphone, color: 'bg-primary' },
                                { text: 'New honors awarded for Excellence.', time: 'Event • Yesterday', icon: Trophy, color: 'bg-amber-500' }
                            ].map((update, i) => (
                                <div key={i} className="flex gap-6 group cursor-default">
                                    <div className={`size-14 rounded-[1.25rem] ${update.color} flex items-center justify-center shadow-xl text-white group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 ring-4 ring-white/50`}>
                                        <update.icon size={22} />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-[15px] font-black text-slate-900 leading-snug group-hover:text-primary transition-colors duration-300">{update.text}</p>
                                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.25em] mt-3 opacity-70 group-hover:opacity-100 transition-opacity">{update.time}</p>
                                    </div>
                                </div>
                            ))}
                            <button className="w-full py-5 text-[10px] text-slate-400 font-black uppercase tracking-[0.3em] border border-slate-100 rounded-[1.25rem] hover:bg-white hover:text-primary hover:border-primary/20 transition-all duration-500 mt-8">
                                Archive Vault
                            </button>
                        </div>
                    </motion.div>
                </div>

                {/* Manage Exams Table */}
                <motion.div 
                    variants={itemVariants}
                    className="lg:col-span-2 bg-white/40 backdrop-blur-3xl rounded-[3rem] border border-white/50 shadow-xl shadow-slate-200/20 overflow-hidden h-fit"
                >
                    <div className="p-12 border-b border-white/40 flex items-center justify-between">
                        <div>
                            <h3 className="text-3xl font-black text-slate-900 tracking-tighter">Proctoring Console</h3>
                            <p className="text-[11px] text-slate-400 font-black mt-3 uppercase tracking-[0.25em] opacity-80 italic">Automated sequence scheduling</p>
                        </div>
                        <button className="flex items-center gap-3 bg-white text-slate-900 border border-slate-100 px-10 py-5 rounded-[1.5rem] font-black text-xs uppercase tracking-[0.2em] hover:text-primary hover:border-primary hover:shadow-2xl transition-all duration-500 group">
                            <Plus size={20} className="group-hover:rotate-90 transition-transform duration-500" />
                            <span>Schedule</span>
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50/20 text-slate-400 uppercase font-black tracking-[0.3em] text-[10px]">
                                <tr>
                                    <th className="px-12 py-8">Subject Code</th>
                                    <th className="px-12 py-8">Target Demographics</th>
                                    <th className="px-12 py-8">Security Protocol</th>
                                    <th className="px-12 py-8 text-right">Node Controls</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/20">
                                {exams.map((exam, i) => (
                                    <tr key={i} className="hover:bg-white/60 transition-all duration-500 group">
                                        <td className="px-12 py-10">
                                            <div className="font-black text-slate-900 text-xl tracking-tight group-hover:text-primary transition-colors">{exam.title}</div>
                                            <p className="text-[10px] font-black text-slate-400 uppercase mt-2">{exam.examDate ? new Date(exam.examDate).toLocaleDateString() : 'Unscheduled'}</p>
                                        </td>
                                        <td className="px-12 py-10 font-black text-slate-500 text-[13px] uppercase tracking-widest">{exam.Class?.name || 'All Classes'}</td>
                                        <td className="px-12 py-10">
                                            <span className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.25em] shadow-sm ring-1 ring-white/50 animate-pulse ${
                                                exam.published ? 'bg-primary/20 text-primary' : 'bg-slate-100 text-slate-400'
                                            }`}>
                                                {exam.published ? 'Published' : 'Draft'}
                                            </span>
                                        </td>
                                        <td className="px-12 py-10 text-right">
                                            <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="p-4 text-slate-300 hover:text-primary transition-all duration-300"><Edit3 size={20} /></button>
                                                <button className="p-4 text-slate-300 hover:text-red-500 transition-all duration-300"><Trash2 size={20} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>
            </div>

            {/* Leaderboard Management Section */}
            <motion.div 
                variants={itemVariants}
                className="bg-white/40 backdrop-blur-3xl rounded-[4rem] border border-white/50 shadow-2xl shadow-slate-200/20 overflow-hidden relative"
            >
                {/* Decorative background shape */}
                <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-primary/5 blur-[120px] rounded-full -mr-40 -mt-40 animate-pulse-slow"></div>

                <div className="p-16 border-b border-white/40 flex flex-col xl:flex-row xl:items-center justify-between gap-12 relative z-10">
                    <div>
                        <h3 className="text-4xl font-black text-slate-900 tracking-tighter">The Honors Podium</h3>
                        <p className="text-[11px] font-black text-primary mt-4 uppercase tracking-[0.4em] opacity-80">Fall Residency Cycle • Academic Year 24/25</p>
                    </div>
                    <div className="bg-white/60 backdrop-blur-md p-3 rounded-[2rem] border border-white/50 flex gap-3 shadow-inner">
                        {['Class 8', 'Class 9', 'Class 10'].map((grade, i) => (
                            <button key={i} className={`px-10 py-5 rounded-[1.5rem] text-[11px] font-black uppercase tracking-[0.25em] transition-all duration-500 ${grade === 'Class 10' ? 'bg-slate-900 text-white shadow-2xl shadow-slate-900/20' : 'text-slate-400 hover:text-slate-900 hover:bg-white/80'}`}>
                                {grade}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/20 relative z-10">
                    {[
                        { rank: '01', name: 'Sarah Williams', score: '98.4%', label: 'Diamond Merit', color: 'from-primary to-orange-400', ring: 'ring-primary/20 bg-primary/10', text: 'text-primary' },
                        { rank: '02', name: 'Michael Chen', score: '97.2%', label: 'Platinum Grade', color: 'from-indigo-500 to-indigo-400', ring: 'ring-indigo-500/20 bg-indigo-500/10', text: 'text-indigo-500' },
                        { rank: '03', name: 'Aaliyah Khan', score: '96.8%', label: 'Gold Protocol', color: 'from-amber-500 to-amber-400', ring: 'ring-amber-500/20 bg-amber-500/10', text: 'text-amber-500' },
                    ].map((leader, i) => (
                        <div key={i} className="p-16 flex flex-col items-center text-center group hover:bg-white/40 transition-all duration-700 relative overflow-hidden">
                            {/* Hover accent */}
                            <div className={`absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r ${leader.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}></div>

                            <div className={`size-32 rounded-[3rem] ${leader.ring} flex items-center justify-center font-black text-3xl mb-10 shadow-inner ring-4 relative transition-all duration-700 group-hover:scale-110 group-hover:-rotate-6`}>
                                <div className={`absolute inset-4 rounded-[2rem] bg-gradient-to-br ${leader.color} opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-700`}></div>
                                <span className={`relative z-10 ${leader.text}`}>{leader.rank}</span>
                                {i === 0 && <Sparkles className="absolute -top-3 -right-3 text-primary animate-bounce" size={32} />}
                            </div>
                            
                            <h4 className="font-black text-3xl text-slate-900 tracking-tight mb-3 group-hover:text-primary transition-colors">{leader.name}</h4>
                            <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] mb-12 opacity-60 group-hover:opacity-100 transition-opacity">{leader.label}</p>
                            
                            <div className="bg-white/80 backdrop-blur-sm w-full p-6 rounded-[2rem] border border-white/50 mb-12 flex items-center justify-between shadow-sm group-hover:shadow-xl group-hover:scale-105 transition-all duration-700">
                                <div className="flex flex-col items-start gap-1">
                                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em]">Aggregate</span>
                                    <span className="text-sm font-black text-slate-900">Score Rating</span>
                                </div>
                                <span className={`text-4xl font-black ${leader.text} tabular-nums`}>{leader.score}</span>
                            </div>

                            <div className="grid grid-cols-2 gap-4 w-full">
                                <button className={`col-span-2 py-6 bg-slate-900 text-white text-[11px] font-black uppercase tracking-[0.3em] rounded-[1.5rem] shadow-2xl shadow-slate-900/10 hover:bg-primary hover:shadow-primary/30 transition-all duration-500 active:scale-95`}>
                                    Validate Entry
                                </button>
                                <button className="py-5 bg-white text-slate-400 text-[9px] font-black uppercase tracking-[0.2em] rounded-[1.25rem] border border-slate-100 hover:text-slate-900 hover:border-slate-200 transition-all duration-500">Audit</button>
                                <button className="py-5 bg-white text-slate-400 text-[9px] font-black uppercase tracking-[0.2em] rounded-[1.25rem] border border-slate-100 hover:text-slate-900 hover:border-slate-200 transition-all duration-500">Profile</button>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>
        </motion.div>
    );
}
