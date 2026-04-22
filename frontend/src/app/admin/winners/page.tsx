"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Trophy, 
    Calendar, 
    Trash2, 
    Plus,
    Loader2,
    X,
    User,
    Award,
    Hash
} from 'lucide-react';

export default function LeaderboardControl() {
    const [winners, setWinners] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [formData, setFormData] = useState({
        studentName: '',
        className: '',
        examName: '',
        prizeTitle: '',
        rank: '',
        score: ''
    });

    const fetchWinners = async () => {
        setIsLoading(true);
        try {
            const res = await fetch('http://localhost:5000/api/winners');
            const data = await res.json();
            setWinners(data);
        } catch (error) {
            console.error('Error fetching winners:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchWinners();
    }, []);

    const handleAddWinner = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            const res = await fetch('http://localhost:5000/api/winners', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (res.ok) {
                setShowAddModal(false);
                setFormData({ studentName: '', className: '', examName: '', prizeTitle: '', rank: '', score: '' });
                fetchWinners();
            }
        } catch (error) {
            console.error('Error adding winner:', error);
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to remove this winner?')) return;
        try {
            const res = await fetch(`http://localhost:5000/api/winners/${id}`, {
                method: 'DELETE'
            });
            if (res.ok) fetchWinners();
        } catch (error) {
            console.error('Error deleting winner:', error);
        }
    };

    return (
        <div className="space-y-12 pb-20 pt-6">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-10">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight flex items-center">
                        Leaderboard Control <Trophy className="ml-4 text-primary animate-bounce-slow" size={32} />
                    </h1>
                    <p className="text-slate-400 font-bold text-lg mt-2 tracking-tight italic opacity-70">Curate the Hall of Fame for the landing page.</p>
                </div>
                <button 
                    onClick={() => setShowAddModal(true)}
                    className="premium-gradient text-white px-10 py-5 rounded-[1.5rem] font-black shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-3"
                >
                    <Plus size={20} />
                    <span>Authorize Winner</span>
                </button>
            </header>

            {isLoading ? (
                <div className="flex justify-center items-center h-64"><Loader2 className="animate-spin text-primary" size={48} /></div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    <AnimatePresence>
                        {winners.map((winner) => (
                            <motion.div 
                                key={winner.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="bg-white/40 backdrop-blur-3xl p-10 rounded-[3rem] border border-white/50 group relative overflow-hidden flex flex-col hover:shadow-2xl transition-all duration-500"
                            >
                                <div className="size-12 bg-primary text-white rounded-2xl flex items-center justify-center font-black text-xl mb-8 shadow-lg">
                                    #{winner.rank}
                                </div>
                                
                                <h3 className="text-2xl font-black text-slate-900 tracking-tight group-hover:text-primary transition-colors">{winner.studentName}</h3>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-10 opacity-70">{winner.className} • {winner.examName}</p>

                                <div className="bg-white/60 p-6 rounded-[2rem] border border-white mb-8 mt-auto shadow-inner">
                                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] mb-2">Awarded Prize</div>
                                    <div className="text-lg font-black text-slate-900">{winner.prizeTitle}</div>
                                </div>

                                <div className="flex items-center justify-between mt-4">
                                    <span className="text-sm font-black text-primary">Score: {winner.score}%</span>
                                    <button 
                                        onClick={() => handleDelete(winner.id)}
                                        className="size-12 bg-white rounded-2xl flex items-center justify-center text-slate-300 hover:text-rose-500 hover:shadow-lg transition-all duration-500 border border-slate-50"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}

            {/* Empty State */}
            {!isLoading && winners.length === 0 && (
                <div className="text-center py-20 bg-slate-50/50 rounded-[3rem] border-2 border-dashed border-slate-200">
                    <Trophy size={64} className="mx-auto text-slate-200 mb-6" />
                    <p className="text-slate-400 font-black uppercase tracking-widest italic">No winners authorized yet</p>
                </div>
            )}

            {/* Add Modal */}
            <AnimatePresence>
                {showAddModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 lg:p-12">
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowAddModal(false)}
                            className="absolute inset-0 bg-slate-900/40 backdrop-blur-xl"
                        />
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="bg-white rounded-[4rem] p-12 w-full max-w-2xl relative shadow-2xl overflow-hidden"
                        >
                            <div className="flex justify-between items-center mb-12">
                                <h2 className="text-3xl font-black text-slate-900 tracking-tight italic">Authorize New Winner</h2>
                                <button onClick={() => setShowAddModal(false)} className="size-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 hover:text-primary transition-all"><X size={24} /></button>
                            </div>

                            <form onSubmit={handleAddWinner} className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Student Name</label>
                                        <div className="relative">
                                            <User size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" />
                                            <input type="text" value={formData.studentName} onChange={e => setFormData({...formData, studentName: e.target.value})} className="w-full pl-16 pr-6 py-5 bg-slate-50 border border-slate-100 rounded-2xl font-bold outline-none focus:ring-4 focus:ring-primary/10 transition-all placeholder:text-slate-200" placeholder="e.g. Rahul Sharma" required />
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Rank Position</label>
                                        <div className="relative">
                                            <Hash size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" />
                                            <input type="number" value={formData.rank} onChange={e => setFormData({...formData, rank: e.target.value})} className="w-full pl-16 pr-6 py-5 bg-slate-50 border border-slate-100 rounded-2xl font-bold outline-none focus:ring-4 focus:ring-primary/10 transition-all placeholder:text-slate-200" placeholder="e.g. 1" required />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Batch / Class</label>
                                        <input type="text" value={formData.className} onChange={e => setFormData({...formData, className: e.target.value})} className="w-full px-6 py-5 bg-slate-50 border border-slate-100 rounded-2xl font-bold outline-none focus:ring-4 focus:ring-primary/10 transition-all placeholder:text-slate-200" placeholder="e.g. Class 10" required />
                                    </div>
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Exam Name</label>
                                        <input type="text" value={formData.examName} onChange={e => setFormData({...formData, examName: e.target.value})} className="w-full px-6 py-5 bg-slate-50 border border-slate-100 rounded-2xl font-bold outline-none focus:ring-4 focus:ring-primary/10 transition-all placeholder:text-slate-200" placeholder="e.g. Math Scholarship 2024" required />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Prize Title</label>
                                    <div className="relative">
                                        <Award size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" />
                                        <input type="text" value={formData.prizeTitle} onChange={e => setFormData({...formData, prizeTitle: e.target.value})} className="w-full pl-16 pr-6 py-5 bg-slate-50 border border-slate-100 rounded-2xl font-bold outline-none focus:ring-4 focus:ring-primary/10 transition-all placeholder:text-slate-200" placeholder="e.g. Gold Medal + ₹5,000" required />
                                    </div>
                                </div>

                                <button type="submit" disabled={isSaving} className="w-full premium-gradient text-white font-black py-7 rounded-2xl text-lg shadow-2xl flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50">
                                    {isSaving ? <Loader2 className="animate-spin" /> : 'Authorize and Publish'}
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
