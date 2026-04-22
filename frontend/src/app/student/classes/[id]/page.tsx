"use client";
import React from 'react';
import { useParams } from 'next/navigation';
import { BookOpen, Sparkles, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ClassPage() {
    const params = useParams();
    const classId = params.id;

    return (
        <div className="container mx-auto px-6 py-12">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl mx-auto"
            >
                <Link 
                    href="/student" 
                    className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors mb-8 group w-fit"
                >
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="font-bold">Back to Dashboard</span>
                </Link>

                <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-slate-100 relative overflow-hidden mb-12">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                        <BookOpen size={160} className="text-primary" />
                    </div>
                    
                    <div className="relative z-10">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary mb-6">
                            <Sparkles size={16} />
                            <span className="text-xs font-black uppercase tracking-widest">Class {classId}</span>
                        </div>
                        
                        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
                            Welcome to Class <span className="text-primary">{classId}</span> Learning Hub
                        </h1>
                        
                        <p className="text-lg text-slate-600 leading-relaxed mb-8 max-w-2xl">
                            Explore exams, resources, and performance metrics specifically tailored for Class {classId}. Your journey to excellence starts here.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <div className="px-6 py-4 bg-slate-50 rounded-2xl border border-slate-100 flex-1 min-w-[200px]">
                                <h3 className="font-bold text-slate-900 mb-1">Available Exams</h3>
                                <p className="text-sm text-slate-500">Coming soon for Class {classId}</p>
                            </div>
                            <div className="px-6 py-4 bg-slate-50 rounded-2xl border border-slate-100 flex-1 min-w-[200px]">
                                <h3 className="font-bold text-slate-900 mb-1">Study Material</h3>
                                <p className="text-sm text-slate-500">Curated resources for you</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {/* Placeholder Cards */}
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-48 bg-slate-50 border border-dashed border-slate-200 rounded-3xl flex items-center justify-center">
                            <p className="text-slate-400 font-bold italic">More content coming soon...</p>
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
