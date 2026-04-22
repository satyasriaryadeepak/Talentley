"use client";
import React, { useState, useEffect } from 'react';
import { Globe, Save, Loader2, Sparkles, Megaphone, Type } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LandingPageEditor() {
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [formData, setFormData] = useState({
        hero_title: '',
        hero_subtitle: '',
        announcement_title: '',
        announcement_desc: '',
        why_choose_title: '',
        why_choose_desc1: '',
        why_choose_desc2: ''
    });

    useEffect(() => {
        setIsLoading(true);
        fetch('http://localhost:5000/api/settings')
            .then(res => res.json())
            .then(data => {
                setFormData({
                    hero_title: data.hero_title || 'Discover Your Talent with Talentley',
                    hero_subtitle: data.hero_subtitle || 'A dedicated platform for students from Class 1 to Class 10 to participate in competitive talent exams, showcase abilities, and win prestigious rewards.',
                    announcement_title: data.announcement_title || 'Summer Talent Fest 2024',
                    announcement_desc: data.announcement_desc || 'Participate in the National Scholarship Exam. Login to get started!',
                    why_choose_title: data.why_choose_title || 'Why Choose Talentley School?',
                    why_choose_desc1: data.why_choose_desc1 || 'Talentley School is an online examination platform designed to identify and encourage the talents of students. Through structured exams and competitions, students can demonstrate their knowledge and skills.',
                    why_choose_desc2: data.why_choose_desc2 || 'Top-performing students are recognized and rewarded to motivate excellence. Our methodology focuses on analytical thinking rather than rote learning.'
                });
            })
            .catch(console.error)
            .finally(() => setIsLoading(false));
    }, []);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            const res = await fetch('http://localhost:5000/api/settings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (res.ok) {
                alert('Landing page content updated successfully!');
            }
        } catch (error) {
            console.error('Error saving settings:', error);
            alert('Failed to save changes.');
        } finally {
            setIsSaving(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    if (isLoading) {
        return <div className="flex justify-center items-center h-64"><Loader2 className="animate-spin text-primary" size={48} /></div>;
    }

    return (
        <div className="space-y-12 pb-20 max-w-5xl">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight flex items-center">
                        Landing Page Editor <Globe className="ml-3 text-primary animate-pulse" />
                    </h1>
                    <p className="text-slate-400 font-bold text-lg mt-2 tracking-tight">Instantly update the public homepage content directly from here.</p>
                </div>
                <button 
                    onClick={handleSave}
                    disabled={isSaving}
                    className="premium-gradient text-white px-10 py-4 flex items-center gap-2 rounded-[2rem] font-black shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-70 disabled:scale-100"
                >
                    {isSaving ? <Loader2 className="animate-spin" size={24} /> : <Save size={24} />}
                    <span>{isSaving ? 'Saving Changes...' : 'Publish Changes'}</span>
                </button>
            </header>

            <form onSubmit={handleSave} className="space-y-10">
                {/* Hero Section Editor */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-[3rem] p-10 shadow-xl border border-slate-100 relative overflow-hidden group"
                >
                    <div className="absolute top-0 right-0 p-8 opacity-5"><Sparkles size={160} /></div>
                    <div className="flex items-center gap-4 mb-8 relative z-10">
                        <div className="size-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center"><Type size={24} /></div>
                        <h2 className="text-2xl font-black text-slate-900">Hero Section</h2>
                    </div>

                    <div className="space-y-6 relative z-10">
                        <div>
                            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Hero Main Title (e.g. Discover Your Talent)</label>
                            <input 
                                type="text"
                                name="hero_title"
                                value={formData.hero_title}
                                onChange={handleChange}
                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-slate-900 font-bold outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-xl"
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Hero Subtitle</label>
                            <textarea 
                                name="hero_subtitle"
                                rows={3}
                                value={formData.hero_subtitle}
                                onChange={handleChange}
                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-slate-900 font-medium outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                            />
                        </div>
                    </div>
                </motion.div>

                {/* Announcement Banner Editor */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white rounded-[3rem] p-10 shadow-xl border border-slate-100 relative overflow-hidden group"
                >
                    <div className="absolute top-0 right-0 p-8 opacity-5"><Megaphone size={160} /></div>
                    <div className="flex items-center gap-4 mb-8 relative z-10">
                        <div className="size-12 bg-orange-500/10 text-orange-500 rounded-2xl flex items-center justify-center"><Megaphone size={24} /></div>
                        <h2 className="text-2xl font-black text-slate-900">Announcement Banner</h2>
                    </div>

                    <div className="space-y-6 relative z-10">
                        <div>
                            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Banner Title</label>
                            <input 
                                type="text"
                                name="announcement_title"
                                value={formData.announcement_title}
                                onChange={handleChange}
                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-slate-900 font-bold outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-lg"
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Banner Description</label>
                            <textarea 
                                name="announcement_desc"
                                rows={2}
                                value={formData.announcement_desc}
                                onChange={handleChange}
                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-slate-900 font-medium outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all resize-none"
                            />
                        </div>
                    </div>
                </motion.div>

                {/* Why Choose Us Editor */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-[3rem] p-10 shadow-xl border border-slate-100 relative overflow-hidden"
                >
                    <div className="flex items-center gap-4 mb-8">
                        <div className="size-12 bg-emerald-500/10 text-emerald-500 rounded-2xl flex items-center justify-center"><Sparkles size={24} /></div>
                        <h2 className="text-2xl font-black text-slate-900">"Why Choose Us" Section</h2>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Section Title</label>
                            <input 
                                type="text"
                                name="why_choose_title"
                                value={formData.why_choose_title}
                                onChange={handleChange}
                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-slate-900 font-bold outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-lg"
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Paragraph 1</label>
                            <textarea 
                                name="why_choose_desc1"
                                rows={3}
                                value={formData.why_choose_desc1}
                                onChange={handleChange}
                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-slate-900 font-medium outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all resize-none"
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Paragraph 2</label>
                            <textarea 
                                name="why_choose_desc2"
                                rows={3}
                                value={formData.why_choose_desc2}
                                onChange={handleChange}
                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-slate-900 font-medium outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all resize-none"
                            />
                        </div>
                    </div>
                </motion.div>
            </form>
        </div>
    );
}
