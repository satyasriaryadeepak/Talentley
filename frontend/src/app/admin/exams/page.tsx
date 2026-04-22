"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
    Plus, 
    Calendar, 
    Clock, 
    Users, 
    ChevronRight, 
    MoreVertical, 
    Edit3, 
    Trash2,
    Sparkles,
    BookOpen
} from 'lucide-react';

export default function ExamsManagement() {
    const [exams, setExams] = useState<any[]>([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/exams')
            .then(res => res.json())
            .then(data => {
                const mappedExams = data.map((ex: any) => ({
                    id: ex.id,
                    title: ex.title,
                    class: ex.Class?.name || 'All Classes',
                    date: ex.examDate ? new Date(ex.examDate).toLocaleDateString() : 'TBD',
                    duration: `${ex.duration || 60} min`,
                    status: ex.published ? 'published' : 'draft',
                    students: 0 // In a real app, this would be computed from Submissions
                }));
                setExams(mappedExams);
            })
            .catch(console.error);
    }, []);

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
            className="space-y-12 pb-20 pt-6 font-sans"
        >
            <motion.header variants={itemVariants} className="flex flex-col md:flex-row md:items-center justify-between gap-10">
                <div>
                     <h1 className="text-4xl font-black text-slate-900 tracking-tight flex items-center">
                        Assessment Nexus <BookOpen className="ml-4 text-primary animate-pulse" size={32} />
                    </h1>
                    <div className="flex items-center gap-3 mt-4">
                        <div className="size-1.5 bg-primary rounded-full animate-ping"></div>
                        <p className="text-[11px] text-slate-400 font-black uppercase tracking-[0.25em] opacity-80">Examination Protocols • Logic Engine v2.1</p>
                    </div>
                </div>
                <button className="bg-slate-900 text-white px-10 py-5 rounded-[1.5rem] font-black text-xs uppercase tracking-[0.25em] shadow-xl shadow-slate-900/10 flex items-center gap-4 hover:bg-primary hover:scale-105 hover:shadow-primary/30 active:scale-95 transition-all duration-700 group">
                    <Plus size={20} className="group-hover:rotate-12 transition-transform" />
                    <span>Initialize New Exam</span>
                </button>
            </motion.header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {exams.map((exam) => (
                    <motion.div 
                        key={exam.id}
                        variants={itemVariants}
                        className="bg-white/40 backdrop-blur-3xl p-10 rounded-[3rem] border border-white/50 group relative overflow-hidden flex flex-col hover:shadow-2xl hover:-translate-y-2 transition-all duration-700"
                    >
                        <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-all duration-1000 rotate-12 group-hover:rotate-0">
                            <BookOpen size={140} className="text-primary" />
                        </div>

                        <div className="flex justify-between items-start mb-10 relative z-10">
                            <span className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-sm ${
                                exam.status === 'published' ? 'bg-green-500 text-white shadow-green-500/20' : 'bg-slate-400 text-white shadow-slate-400/20'
                            }`}>
                                {exam.status}
                            </span>
                            <div className="relative group/menu">
                                <button className="w-12 h-12 bg-white/60 rounded-2xl flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition-all shadow-sm border border-white/50">
                                    <MoreVertical size={20} />
                                </button>
                                <div className="absolute top-full right-0 mt-4 w-56 bg-white/95 backdrop-blur-xl rounded-[1.5rem] shadow-2xl p-3 opacity-0 group-hover/menu:opacity-100 group-hover/menu:translate-y-0 translate-y-4 pointer-events-none group-hover/menu:pointer-events-auto transition-all z-20 border border-white/60">
                                    <button className="flex items-center w-full px-5 py-4 hover:bg-slate-50 rounded-xl font-black text-[10px] uppercase tracking-widest text-slate-600 transition-colors gap-3">
                                        <Edit3 size={16} className="text-primary" /> <span>Edit Config</span>
                                    </button>
                                    <button className="flex items-center w-full px-5 py-4 hover:bg-rose-50 text-rose-500 rounded-xl font-black text-[10px] uppercase tracking-widest transition-colors gap-3">
                                        <Trash2 size={16} /> <span>Terminate</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="relative z-10">
                            <h3 className="text-2xl font-black text-slate-900 mb-2 tracking-tight group-hover:text-primary transition-colors leading-tight">{exam.title}</h3>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] mb-10 italic">{exam.class} Division</p>
                        </div>

                        <div className="space-y-5 mb-12 mt-auto relative z-10">
                            <div className="flex items-center text-slate-500 font-black text-[11px] uppercase tracking-wider">
                                <div className="size-8 bg-white rounded-xl flex items-center justify-center text-primary mr-4 shadow-sm border border-slate-50">
                                    <Calendar size={14} />
                                </div>
                                {exam.date}
                            </div>
                            <div className="flex items-center text-slate-500 font-black text-[11px] uppercase tracking-wider">
                                <div className="size-8 bg-white rounded-xl flex items-center justify-center text-primary mr-4 shadow-sm border border-slate-50">
                                    <Clock size={14} />
                                </div>
                                {exam.duration} assessment
                            </div>
                            <div className="flex items-center text-slate-500 font-black text-[11px] uppercase tracking-wider">
                                <div className="size-8 bg-white rounded-xl flex items-center justify-center text-primary mr-4 shadow-sm border border-slate-50">
                                    <Users size={14} />
                                </div>
                                {exam.students} candidates active
                            </div>
                        </div>

                        <button className="w-full py-5 bg-slate-900 text-white font-black text-[10px] uppercase tracking-[0.25em] rounded-[1.5rem] hover:bg-primary transition-all duration-700 flex items-center justify-center gap-3 shadow-2xl shadow-slate-900/10 group-actions relative overflow-hidden">
                            <span className="relative z-10">Manage Question Bank</span>
                            <ChevronRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                            <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </button>
                    </motion.div>
                ))}
            </div>

            <motion.div 
                variants={itemVariants}
                className="bg-slate-900 p-16 rounded-[4rem] relative overflow-hidden text-center group shadow-3xl"
            >
                 <div className="absolute top-0 left-0 w-full h-full opacity-10 blur-[100px] bg-primary animate-pulse"></div>
                 <div className="relative z-10 max-w-2xl mx-auto">
                     <Sparkles className="text-primary size-12 mx-auto mb-8 animate-bounce" />
                     <h2 className="text-3xl font-black text-white mb-4 tracking-tight uppercase">Custom Logic Integration?</h2>
                     <p className="text-slate-400 font-black text-[11px] uppercase tracking-[0.2em] mb-12 opacity-80 italic">Contact the architectural team for advanced proctoring and pattern recognition nodes.</p>
                     <button className="px-12 py-5 bg-white text-slate-900 rounded-[2rem] font-black text-xs uppercase tracking-[0.3em] hover:bg-primary hover:text-white transition-all duration-700 shadow-2xl">
                        Request Architectural Intel
                     </button>
                 </div>
            </motion.div>
        </motion.div>
    );
}
