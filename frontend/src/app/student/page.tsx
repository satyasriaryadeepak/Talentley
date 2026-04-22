"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
    Calendar, 
    Calculator, 
    Beaker, 
    Clock, 
    ClipboardList, 
    Play, 
    History, 
    Medal, 
    Zap, 
    Star, 
    Brain, 
    Lock,
    TrendingUp,
    ChevronRight,
    School,
    Sparkles
} from 'lucide-react';

export default function StudentDashboard() {
    const [exams, setExams] = useState<any[]>([]);
    const [marqueeText, setMarqueeText] = useState('Welcome to Talentley! Stay tuned for upcoming exams and new features.');
    const [ads, setAds] = useState<any[]>([]);

    useEffect(() => {
        // Fetch exams
        fetch('http://localhost:5000/api/exams')
            .then(res => res.json())
            .then(data => setExams(data))
            .catch(console.error);

        // Fetch announcements/marquee from settings
        fetch('http://localhost:5000/api/settings')
            .then(res => res.json())
            .then(data => {
                if (data && data.student_marquee_text) {
                    setMarqueeText(data.student_marquee_text);
                }
            })
            .catch(console.error);

        // Fetch advertisements
        fetch('http://localhost:5000/api/advertisements')
            .then(res => res.json())
            .then(data => setAds(data.filter((ad: any) => ad.status)))
            .catch(console.error);
    }, []);

    return (
        <div className="flex flex-col min-h-screen">
            {/* Dynamic Announcement Banner (Marquee) */}
            <section className="bg-rose-500 text-white py-3 overflow-hidden shadow-inner flex items-center border-b border-rose-600">
                <motion.div 
                    animate={{ x: [0, -2000] }}
                    transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
                    className="whitespace-nowrap flex font-black text-xs md:text-sm uppercase tracking-[0.2em]"
                >
                    <span className="mx-8">{marqueeText} • {marqueeText} • {marqueeText}</span>
                    <span className="mx-8">{marqueeText} • {marqueeText} • {marqueeText}</span>
                </motion.div>
            </section>

            {/* Banner Area (Optional context for the carousel) */}
            <section className="bg-slate-900 text-white pt-12 pb-24 px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="container mx-auto relative z-10">
                    <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter">Your Learning Journey.</h1>
                    <p className="text-xl text-slate-400 font-medium">Discover, enroll, and excel in upcoming assessments.</p>
                </div>
            </section>

            {/* Promotional Poster Slider (Scrolling Posters) */}
            <section className="container mx-auto px-6 -mt-12 relative z-20 mb-16">
                <div className="flex gap-6 overflow-x-auto pb-8 custom-scrollbar snap-x snap-mandatory rounded-[2rem]">
                    {ads.length > 0 ? ads.map((ad: any, i: number) => (
                        <div 
                            key={ad.id || i}
                            className="snap-center shrink-0 w-full min-h-[300px] md:min-h-[450px] rounded-[2rem] p-8 md:p-16 flex flex-col justify-end relative overflow-hidden group shadow-2xl bg-slate-900 border border-slate-800"
                            style={ad.image ? { backgroundImage: `url(${ad.image})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
                        >
                            {/* Gradient Overlay for Text Readability */}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent z-0"></div>
                            
                            <div className="relative z-10">
                                <span className="px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-xs font-black uppercase tracking-widest text-white border border-white/20 mb-4 inline-block shadow-sm">Featured</span>
                                <h3 className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight tracking-tight drop-shadow-lg">{ad.title}</h3>
                                <p className="text-white/80 font-medium md:text-xl max-w-lg mb-6">{ad.description}</p>
                                {ad.buttonText && (
                                    <Link href={ad.redirectLink || '#'} className="bg-primary text-white hover:bg-white hover:text-primary px-8 py-3 rounded-full font-bold transition-colors mt-2 inline-block shadow-lg">
                                        {ad.buttonText}
                                    </Link>
                                )}
                            </div>
                        </div>
                    )) : (
                        <div className="snap-center shrink-0 w-full min-h-[300px] md:min-h-[450px] rounded-[2rem] p-8 md:p-16 flex flex-col justify-center items-center relative overflow-hidden shadow-2xl bg-slate-100 border-2 border-dashed border-slate-300">
                            <h3 className="text-2xl font-black text-slate-400">No Posters Configured</h3>
                            <p className="text-slate-400 font-bold mt-2">Head to the Admin Dashboard to add promotional posters!</p>
                        </div>
                    )}
                </div>
                {/* Pagination Dots (dynamic based on ads length) */}
                {ads.length > 0 && (
                    <div className="flex justify-center items-center gap-3 mt-4">
                        {ads.map((_, idx) => (
                            <div key={idx} className={`size-3 rounded-full transition-all cursor-pointer ${idx === 0 ? 'bg-primary w-8' : 'bg-slate-300 hover:bg-slate-400'}`}></div>
                        ))}
                    </div>
                )}
            </section>

            {/* Slide Scrolling of Exams (Carousel) */}
            <section className="container mx-auto px-6 relative z-20 mb-12">
                <div className="flex gap-6 overflow-x-auto pb-8 custom-scrollbar snap-x">
                    {(exams.length > 0 ? exams.slice(0, 5) : [1, 2, 3, 4]).map((exam: any, i: number) => (
                        <motion.div 
                            key={exam.id || i}
                            whileHover={{ y: -10 }}
                            className="bg-white p-8 rounded-[3rem] shadow-xl shadow-slate-200 border border-slate-100 min-w-[320px] md:min-w-[400px] flex-shrink-0 snap-center group transition-all duration-300"
                        >
                            <div className={`size-16 rounded-2xl flex items-center justify-center mb-6 shadow-inner ${i % 2 === 0 ? 'bg-primary/10 text-primary' : 'bg-secondary/10 text-secondary'}`}>
                                <Star size={32} className="group-hover:rotate-12 transition-transform" />
                            </div>
                            <h3 className="text-2xl font-black text-slate-900 mb-2">{exam.title || 'Upcoming Exam ' + i}</h3>
                            <p className="text-slate-500 font-bold mb-6 line-clamp-2">{exam.description || 'Test your skills in this comprehensive assessment.'}</p>
                            
                            <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-100">
                                <div className="text-xs font-black uppercase tracking-widest text-slate-400">
                                    {exam.Class?.name || 'All Classes'}
                                </div>
                                <Link href={`/student/exams/${exam.id || 1}`} className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-primary transition-colors shadow-md text-center block">
                                    Enroll
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Exams List */}
            <section className="container mx-auto px-6 py-20 flex-grow">
                <div className="flex items-center justify-between mb-12">
                    <h2 className="text-4xl font-black text-slate-900 tracking-tighter">All Exams</h2>
                    <button className="flex items-center gap-2 text-primary font-bold hover:text-slate-900 transition-colors">
                        Filter <ChevronRight size={20} />
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {exams.map((exam: any, i: number) => (
                        <motion.div 
                            key={exam.id || i}
                            whileHover={{ scale: 1.02 }}
                            className="bg-white p-8 rounded-[2rem] border-2 border-slate-100 hover:border-primary/20 transition-all shadow-sm hover:shadow-xl group"
                        >
                            <h3 className="text-xl font-black text-slate-900 mb-2 group-hover:text-primary transition-colors">{exam.title}</h3>
                            <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6">
                                <span className="flex items-center gap-1"><Clock size={14} className="text-secondary" /> {exam.duration || 60}m</span>
                                <span className="flex items-center gap-1"><Calendar size={14} className="text-secondary" /> {exam.examDate ? new Date(exam.examDate).toLocaleDateString() : 'TBD'}</span>
                            </div>
                            <p className="text-sm font-bold text-slate-500 mb-8 line-clamp-3">{exam.description}</p>
                            <Link href={`/student/exams/${exam.id || 1}`} className="w-full py-4 bg-slate-50 text-slate-600 rounded-xl font-black hover:bg-slate-900 hover:text-white transition-all flex items-center justify-center gap-2 mt-auto block text-center">
                                Start Assessment <Play size={16} fill="currentColor" className="inline" />
                            </Link>
                        </motion.div>
                    ))}
                    {exams.length === 0 && (
                        <div className="col-span-full py-20 text-center text-slate-500 font-bold">
                            No exams currently available. Check back later!
                        </div>
                    )}
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-slate-900 text-slate-400 py-12 px-6 border-t border-slate-800">
                <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-3">
                        <div className="size-8 bg-primary/20 text-primary rounded-lg flex items-center justify-center"><School size={16} /></div>
                        <span className="font-black text-white text-xl tracking-tight">Talentley.</span>
                    </div>
                    <div className="text-sm font-bold flex gap-8">
                        <a href="#" className="hover:text-white transition-colors">Privacy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms</a>
                        <a href="#" className="hover:text-white transition-colors">Support</a>
                    </div>
                    <div className="text-[10px] font-black uppercase tracking-widest opacity-50">
                        &copy; 2026 Talentley Education.
                    </div>
                </div>
            </footer>
        </div>
    );
}
