"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    MessageSquare, 
    Plus, 
    MoreVertical, 
    Send, 
    Trash2, 
    Users, 
    AlertCircle, 
    Sparkles, 
    Info,
    Calendar,
    X,
    Check
} from 'lucide-react';

export default function AnnouncementsManagement() {
    const [announcements, setAnnouncements] = useState<any[]>([]);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [formData, setFormData] = useState({ title: '', content: '', priority: 'normal', targetClass: 'All Students' });

    const fetchAnnouncements = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/announcements');
            const data = await res.json();
            setAnnouncements(data);
        } catch (error) {
            console.error('Error fetching announcements:', error);
        }
    };

    useEffect(() => {
        fetchAnnouncements();
    }, []);

    const handleCreateAnnouncement = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:5000/api/announcements', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (res.ok) {
                setIsCreateModalOpen(false);
                setFormData({ title: '', content: '', priority: 'normal', targetClass: 'All Students' });
                fetchAnnouncements();
            }
        } catch (error) {
            console.error('Error creating announcement:', error);
        }
    };

    const handleDeleteAnnouncement = async (id: number) => {
        if (!confirm('Are you sure you want to revoke this announcement?')) return;
        try {
            const res = await fetch(`http://localhost:5000/api/announcements/${id}`, { method: 'DELETE' });
            if (res.ok) fetchAnnouncements();
        } catch (error) {
            console.error('Error deleting announcement:', error);
        }
    };

    return (
        <div className="space-y-12 pb-20">
             <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                     <h1 className="text-4xl font-black text-slate-900 tracking-tight flex items-center">
                        Communication Hub <Sparkles className="ml-3 text-primary animate-pulse" />
                    </h1>
                    <p className="text-slate-400 font-bold text-lg mt-2 tracking-tight">Broadcast updates, news, and alerts to the student body.</p>
                </div>
                <button 
                    onClick={() => setIsCreateModalOpen(true)}
                    className="premium-gradient text-white px-10 py-4 rounded-[2rem] font-black shadow-lg shadow-primary/20 flex items-center space-x-3 hover:scale-105 active:scale-95 transition-all"
                >
                    <Plus size={24} />
                    <span>Create Announcement</span>
                </button>
            </header>

            <div className="max-w-5xl space-y-8">
                {announcements.map((ann, idx) => (
                    <motion.div 
                        key={ann.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="glass-card p-10 rounded-[3rem] border-white hover:bg-white transition-all duration-500 shadow-xl group border-l-[12px] border-l-primary"
                        style={{ borderLeftColor: ann.type === 'warning' ? '#f59e0b' : ann.type === 'success' ? '#10b981' : '#2563eb' }}
                    >
                        <div className="flex justify-between items-start mb-6">
                            <div className="flex items-center space-x-3">
                                {ann.priority === 'high' ? <AlertCircle className="text-orange-500" size={24} /> : <Info className="text-primary" size={24} />}
                                <span className="text-sm font-black text-slate-400 uppercase tracking-widest">{ann.targetClass}</span>
                            </div>
                            <div className="flex items-center space-x-4">
                                <span className="text-xs font-bold text-slate-300 flex items-center">
                                    <Calendar size={14} className="mr-1" /> {new Date(ann.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                        </div>

                        <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight group-hover:text-primary transition-colors">{ann.title}</h3>
                        <p className="text-slate-500 text-lg font-medium leading-relaxed mb-10">{ann.content}</p>

                        <div className="flex items-center space-x-4 mt-8">
                            <button onClick={() => handleDeleteAnnouncement(ann.id)} className="flex items-center space-x-2 text-sm font-black text-red-500 px-6 py-2 bg-red-50 rounded-xl hover:bg-red-100 transition-colors">
                                <Trash2 size={16} /> <span>Revoke</span>
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="bg-slate-900 rounded-[3.5rem] p-12 text-white relative overflow-hidden group shadow-2xl">
                 <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity translate-x-4 -translate-y-4">
                    <MessageSquare size={160} />
                </div>
                <div className="relative z-10 max-w-2xl">
                    <h2 className="text-3xl font-black mb-6 tracking-tight">Email Integration</h2>
                    <p className="text-slate-400 text-xl font-medium leading-relaxed mb-10">
                        Connect your SMTP server to send announcements directly to student and parent email addresses.
                    </p>
                    <button className="bg-white text-slate-900 px-10 py-4 rounded-2xl font-black hover:scale-105 transition-transform shadow-xl">
                        Configure SMTP
                    </button>
                </div>
            </div>

            {/* Create Announcement Modal */}
            <AnimatePresence>
                {isCreateModalOpen && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-50 flex items-center justify-center p-4"
                    >
                        <motion.div 
                            initial={{ scale: 0.95, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.95, y: 20 }}
                            className="bg-white rounded-[3rem] p-10 w-full max-w-2xl shadow-2xl overflow-hidden relative"
                        >
                            <button 
                                onClick={() => setIsCreateModalOpen(false)}
                                className="absolute top-8 right-8 p-2 bg-slate-50 text-slate-400 hover:text-slate-900 rounded-xl transition-colors"
                            >
                                <X size={24} />
                            </button>
                            
                            <h2 className="text-3xl font-black text-slate-900 mb-2">Create Announcement</h2>
                            <p className="text-slate-500 font-bold mb-8">Broadcast a new update to students.</p>

                            <form onSubmit={handleCreateAnnouncement} className="space-y-6">
                                <div>
                                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Title</label>
                                    <input 
                                        type="text"
                                        required
                                        value={formData.title}
                                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-slate-900 font-bold outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                        placeholder="e.g. Server Maintenance Notice"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Content</label>
                                    <textarea 
                                        required
                                        rows={4}
                                        value={formData.content}
                                        onChange={(e) => setFormData({...formData, content: e.target.value})}
                                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-slate-900 font-medium outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                                        placeholder="Write your announcement here..."
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Priority</label>
                                        <select 
                                            value={formData.priority}
                                            onChange={(e) => setFormData({...formData, priority: e.target.value})}
                                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-slate-900 font-bold outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none"
                                        >
                                            <option value="normal">Normal</option>
                                            <option value="high">High (Alert)</option>
                                            <option value="low">Low (Info)</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Target Audience</label>
                                        <input 
                                            type="text"
                                            value={formData.targetClass}
                                            onChange={(e) => setFormData({...formData, targetClass: e.target.value})}
                                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-slate-900 font-bold outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                            placeholder="e.g. All Students, Class 10"
                                        />
                                    </div>
                                </div>

                                <div className="pt-6">
                                    <button 
                                        type="submit"
                                        className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black hover:bg-primary transition-colors flex items-center justify-center gap-2 shadow-lg"
                                    >
                                        Broadcast Announcement <Send size={18} />
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
