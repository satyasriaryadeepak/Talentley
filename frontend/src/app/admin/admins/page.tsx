"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Plus, Trash2, UserPlus, Lock, User } from 'lucide-react';

export default function ManageAdmins() {
    const [admins, setAdmins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [message, setMessage] = useState({ text: '', type: '' });

    useEffect(() => {
        fetchAdmins();
    }, []);

    const fetchAdmins = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/admins');
            const data = await res.json();
            setAdmins(data);
        } catch (err) {
            console.error('Failed to fetch admins');
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage({ text: '', type: '' });
        
        try {
            const res = await fetch('http://localhost:5000/api/admins', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            
            if (res.ok) {
                setMessage({ text: 'Admin created successfully!', type: 'success' });
                setFormData({ username: '', password: '' });
                setIsAdding(false);
                fetchAdmins();
            } else {
                setMessage({ text: data.message || 'Failed to create admin', type: 'error' });
            }
        } catch (err) {
            setMessage({ text: 'Connection error', type: 'error' });
        }
    };

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
            <motion.header variants={itemVariants} className="flex flex-col md:flex-row md:items-center justify-between gap-10">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight flex items-center">
                        Security Nexus <Shield className="ml-4 text-primary animate-pulse" size={32} />
                    </h1>
                    <div className="flex items-center gap-3 mt-4">
                        <div className="size-1.5 bg-primary rounded-full animate-ping"></div>
                        <p className="text-[11px] text-slate-400 font-black uppercase tracking-[0.25em] opacity-80">Encryption Protocol Active • Firewall Level 07</p>
                    </div>
                </div>
                <button 
                    onClick={() => setIsAdding(!isAdding)}
                    className={`flex items-center gap-4 px-10 py-5 rounded-[1.5rem] font-black text-xs uppercase tracking-[0.25em] transition-all duration-700 active:scale-95 shadow-xl ${
                        isAdding 
                        ? 'bg-white text-slate-500 border border-white/50 shadow-sm' 
                        : 'bg-slate-900 text-white shadow-slate-900/10 hover:bg-primary hover:shadow-primary/30 group'
                    }`}
                >
                    {isAdding ? <Plus className="rotate-45 transition-transform duration-500" /> : <UserPlus size={20} className="group-hover:rotate-12 transition-transform" />}
                    <span>{isAdding ? 'Close Console' : 'Grant New Access'}</span>
                </button>
            </motion.header>

            {isAdding && (
                <motion.div 
                    variants={itemVariants}
                    className="bg-white/40 backdrop-blur-3xl p-12 rounded-[2.5rem] border border-white/50 shadow-2xl shadow-primary/5 relative overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
                    
                    <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-3 gap-12 items-end">
                        <div className="space-y-4">
                            <label className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-400 ml-2 italic">Access Identifier</label>
                            <div className="relative group">
                                <User className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors duration-300" size={20} />
                                <input 
                                    type="text" 
                                    placeholder="e.g. root_nexus"
                                    value={formData.username}
                                    onChange={(e) => setFormData({...formData, username: e.target.value})}
                                    className="w-full pl-16 pr-8 py-5 bg-white/60 border border-white/50 rounded-[1.5rem] focus:ring-[15px] focus:ring-primary/5 focus:bg-white focus:border-primary/20 transition-all font-bold text-[15px] outline-none shadow-inner placeholder:text-slate-300"
                                    required
                                />
                            </div>
                        </div>
                        <div className="space-y-4">
                            <label className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-400 ml-2 italic">Cipher Key</label>
                            <div className="relative group">
                                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors duration-300" size={20} />
                                <input 
                                    type="password" 
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                                    className="w-full pl-16 pr-8 py-5 bg-white/60 border border-white/50 rounded-[1.5rem] focus:ring-[15px] focus:ring-primary/5 focus:bg-white focus:border-primary/20 transition-all font-bold text-[15px] outline-none shadow-inner placeholder:text-slate-300"
                                    required
                                />
                            </div>
                        </div>
                        <button type="submit" className="bg-slate-900 text-white py-5 rounded-[1.5rem] font-black text-xs uppercase tracking-[0.25em] hover:bg-primary transition-all duration-700 shadow-2xl shadow-slate-900/10 active:scale-95 group">
                            Invoke Authorization
                        </button>
                    </form>
                    {message.text && (
                        <motion.p 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`mt-10 text-[11px] font-black uppercase tracking-[0.3em] text-center ${message.type === 'success' ? 'text-green-500' : 'text-rose-500'}`}
                        >
                            {message.text}
                        </motion.p>
                    )}
                </motion.div>
            )}

            <motion.div 
                variants={itemVariants}
                className="bg-white/40 backdrop-blur-3xl rounded-[3rem] border border-white/50 shadow-xl shadow-slate-200/20 overflow-hidden"
            >
                <table className="w-full text-left">
                    <thead className="bg-slate-50/20 text-slate-400 uppercase font-black tracking-[0.3em] text-[10px]">
                        <tr>
                            <th className="px-12 py-8">Entity Profile</th>
                            <th className="px-12 py-8">Privilege Class</th>
                            <th className="px-12 py-8">Initialization Date</th>
                            <th className="px-12 py-8 text-right">Settings</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/20">
                        {loading ? (
                            <tr><td colSpan={4} className="px-12 py-24 text-center text-slate-400 font-black uppercase tracking-[0.3em] text-xs opacity-40 italic">Syncing mainframe records...</td></tr>
                        ) : admins.map((admin: any) => (
                            <tr key={admin.id} className="hover:bg-white/60 transition-all duration-500 group cursor-default">
                                <td className="px-12 py-12">
                                    <div className="flex items-center gap-7">
                                        <div className="size-16 rounded-[1.5rem] bg-white border border-slate-50 flex items-center justify-center text-primary font-black text-2xl shadow-2xl shadow-slate-200/50 transition-all duration-700 group-hover:scale-110 group-hover:rotate-3 group-hover:bg-primary group-hover:text-white group-hover:shadow-primary/30">
                                            {admin.username.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <span className="font-black text-slate-900 text-xl block leading-none mb-3 group-hover:text-primary transition-colors">{admin.username}</span>
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] opacity-80 group-hover:opacity-100 transition-opacity italic">Primary Custodian</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-12 py-12">
                                    <span className="px-6 py-2.5 bg-slate-900 text-white rounded-full text-[10px] font-black uppercase tracking-[0.25em] shadow-2xl shadow-slate-900/10 group-hover:bg-primary group-hover:shadow-primary/30 transition-all duration-500 cursor-help">
                                        {admin.role || 'CUSTODIAN'}
                                    </span>
                                </td>
                                <td className="px-12 py-12 text-slate-400 font-black text-[11px] uppercase tracking-widest opacity-80 group-hover:opacity-100 transition-opacity">
                                    {new Date(admin.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                </td>
                                <td className="px-12 py-12 text-right">
                                    <button className="size-12 bg-white rounded-2xl flex items-center justify-center text-slate-300 hover:text-rose-500 transition-all duration-500 ml-auto shadow-sm border border-transparent hover:border-rose-100 hover:shadow-xl hover:shadow-rose-500/10 group-actions">
                                        <Trash2 size={20} className="group-hover:scale-110 group-hover:-rotate-12 transition-transform" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </motion.div>
        </motion.div>
    );
}
