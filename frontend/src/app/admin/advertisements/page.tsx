"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Image as ImageIcon,
    Plus, 
    Trash2, 
    Sparkles, 
    Calendar,
    X,
    Link as LinkIcon,
    Type,
    BookOpen
} from 'lucide-react';

export default function StudentHomeControl() {
    // ---- DATA STATE ----
    const [ads, setAds] = useState<any[]>([]);
    const [exams, setExams] = useState<any[]>([]);
    
    // ---- MARQUEE STATE ----
    const [marqueeText, setMarqueeText] = useState('');
    const [isSavingMarquee, setIsSavingMarquee] = useState(false);

    // ---- AD POSTER MODAL STATE ----
    const [isAdModalOpen, setIsAdModalOpen] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [adFormData, setAdFormData] = useState({ 
        title: '', description: '', image: '', buttonText: '', redirectLink: '', status: true 
    });

    // ---- EXAM MODAL STATE ----
    const [isExamModalOpen, setIsExamModalOpen] = useState(false);
    const [examFormData, setExamFormData] = useState({
        title: '', description: '', examDate: '', duration: 60, published: true
    });

    // ---- FETCH API ----
    const fetchAllData = async () => {
        try {
            const [adsRes, examsRes, settingsRes] = await Promise.all([
                fetch('http://localhost:5000/api/advertisements'),
                fetch('http://localhost:5000/api/exams'),
                fetch('http://localhost:5000/api/settings')
            ]);
            setAds(await adsRes.json());
            setExams(await examsRes.json());
            
            const settingsData = await settingsRes.json();
            if (settingsData && settingsData.student_marquee_text) {
                setMarqueeText(settingsData.student_marquee_text);
            }
        } catch (error) { console.error('Error fetching data:', error); }
    };

    useEffect(() => { fetchAllData(); }, []);

    // ---- HANDLERS ----
    const handleSaveMarquee = async () => {
        setIsSavingMarquee(true);
        try {
            await fetch('http://localhost:5000/api/settings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ student_marquee_text: marqueeText })
            });
        } catch (err) { console.error('Error saving marquee', err); }
        setIsSavingMarquee(false);
    };

    const handleCreateAd = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const data = new FormData();
            data.append('title', adFormData.title);
            data.append('description', adFormData.description);
            data.append('buttonText', adFormData.buttonText);
            data.append('redirectLink', adFormData.redirectLink);
            data.append('status', adFormData.status.toString());
            if (imageFile) data.append('image', imageFile);
            else if (adFormData.image) data.append('image', adFormData.image);

            const res = await fetch('http://localhost:5000/api/advertisements', {
                method: 'POST', body: data
            });
            if (res.ok) {
                setIsAdModalOpen(false);
                setAdFormData({ title: '', description: '', image: '', buttonText: '', redirectLink: '', status: true });
                setImageFile(null);
                fetchAllData();
            }
        } catch (error) { console.error('Error creating ad:', error); }
    };

    const handleDeleteAd = async (id: number) => {
        if (!confirm('Are you sure you want to delete this promotional poster?')) return;
        try {
            const res = await fetch(`http://localhost:5000/api/advertisements/${id}`, { method: 'DELETE' });
            if (res.ok) fetchAllData();
        } catch (error) { console.error('Error deleting ad:', error); }
    };

    const handleCreateExam = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:5000/api/exams', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(examFormData)
            });
            if (res.ok) {
                setIsExamModalOpen(false);
                setExamFormData({ title: '', description: '', examDate: '', duration: 60, published: true });
                fetchAllData();
            }
        } catch (error) { console.error('Error creating exam:', error); }
    };

    const handleDeleteExam = async (id: number) => {
        if (!confirm('Are you sure you want to delete this exam?')) return;
        try {
            const res = await fetch(`http://localhost:5000/api/exams/${id}`, { method: 'DELETE' });
            if (res.ok) fetchAllData();
        } catch (error) { console.error('Error deleting exam:', error); }
    };

    return (
        <div className="space-y-16 pb-20">
            {/* Header */}
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                     <h1 className="text-4xl font-black text-slate-900 tracking-tight flex items-center">
                        Student Home Control <Sparkles className="ml-3 text-primary animate-pulse" />
                    </h1>
                    <p className="text-slate-400 font-bold text-lg mt-2 tracking-tight flex items-center gap-2">
                        Manage the marquee, posters, and exams on the dashboard.
                    </p>
                </div>
            </header>

            {/* Section 1: Marquee Text */}
            <section className="bg-white p-8 md:p-10 rounded-[3rem] shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col md:flex-row gap-6 items-end relative overflow-hidden group">
                <div className="absolute -right-10 -top-10 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Type size={180} className="text-rose-500" />
                </div>
                <div className="flex-grow w-full relative z-10">
                    <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3"><Type className="text-rose-500"/> Scrolling Announcement</h2>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 ml-1">Live Marquee Text</label>
                    <input 
                        type="text" 
                        value={marqueeText} 
                        onChange={e => setMarqueeText(e.target.value)} 
                        placeholder="e.g. Welcome to Talentley! Stay tuned for upcoming exams..."
                        className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 text-slate-900 font-bold outline-none focus:border-rose-500 hover:border-slate-200 transition-all shadow-inner"
                    />
                </div>
                <button 
                    onClick={handleSaveMarquee}
                    disabled={isSavingMarquee}
                    className="whitespace-nowrap bg-rose-500 text-white px-10 py-4 rounded-2xl font-black hover:bg-rose-600 active:scale-95 transition-all shadow-lg shadow-rose-500/30 w-full md:w-auto relative z-10"
                >
                    {isSavingMarquee ? 'Saving...' : 'Update Marquee'}
                </button>
            </section>

            {/* Section 2: Promotional Posters */}
            <section className="space-y-8">
                <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                    <h2 className="text-3xl font-black text-slate-900 flex items-center"><ImageIcon className="mr-3 text-primary" size={32}/> Poster Showcase</h2>
                    <button onClick={() => setIsAdModalOpen(true)} className="text-sm font-black text-white bg-slate-900 hover:bg-primary transition-colors px-6 py-3 rounded-full flex items-center gap-2 shadow-xl shadow-slate-900/10">
                        <Plus size={18}/> Add Poster
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                    {ads.map((ad, idx) => (
                        <motion.div 
                            key={ad.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl group overflow-hidden flex flex-col h-[400px] relative hover:-translate-y-1 transition-transform"
                        >
                            <div 
                                className="h-3/5 relative bg-slate-900 overflow-hidden"
                                style={ad.image && ad.image.startsWith('http') ? { backgroundImage: `url(${ad.image})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
                            >
                                {(!ad.image || !ad.image.startsWith('http')) && (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white/30 bg-gradient-to-br from-violet-600 to-indigo-800">
                                        <ImageIcon size={48} className="mb-4 opacity-50" />
                                        <span className="font-bold tracking-widest uppercase text-[10px]">No Image Provided</span>
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent flex items-end p-6">
                                    <h3 className="text-2xl font-black text-white drop-shadow-lg">{ad.title}</h3>
                                </div>
                                <button onClick={() => handleDeleteAd(ad.id)} className="absolute top-4 right-4 bg-red-500/80 backdrop-blur-md text-white p-2.5 rounded-full hover:bg-red-500 transition-colors opacity-0 group-hover:opacity-100 shadow-xl">
                                    <Trash2 size={16}/>
                                </button>
                            </div>

                            <div className="p-6 h-2/5 flex flex-col">
                                <p className="text-slate-500 text-sm font-medium leading-relaxed mb-4 line-clamp-2">{ad.description}</p>
                                <div className="flex items-center gap-4 mt-auto">
                                    {ad.buttonText && <span className="px-4 py-1.5 bg-slate-100 rounded-lg text-xs font-bold text-slate-600">Btn: {ad.buttonText}</span>}
                                    {ad.redirectLink && <span className="text-xs font-bold text-primary flex items-center"><LinkIcon size={12} className="mr-1"/> Linked</span>}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                    {ads.length === 0 && <div className="col-span-full py-16 text-center text-slate-400 font-bold bg-white rounded-[3rem] border border-slate-100 shadow-sm">No posters live. Create one to feature on the student home!</div>}
                </div>
            </section>

            {/* Section 3: Upcoming Exams */}
            <section className="space-y-8">
                <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                    <h2 className="text-3xl font-black text-slate-900 flex items-center"><BookOpen className="mr-3 text-secondary" size={32}/> Upcoming Exams</h2>
                    <button onClick={() => setIsExamModalOpen(true)} className="text-sm font-black text-white bg-slate-900 hover:bg-secondary transition-colors px-6 py-3 rounded-full flex items-center gap-2 shadow-xl shadow-slate-900/10">
                        <Plus size={18}/> Add Exam
                    </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {exams.map(exam => (
                        <div key={exam.id} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm relative group hover:border-secondary/50 hover:shadow-xl transition-all hover:-translate-y-1 flex flex-col h-full">
                            <button onClick={() => handleDeleteExam(exam.id)} className="absolute top-4 right-4 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity bg-red-50 p-2 rounded-lg">
                                <Trash2 size={16}/>
                            </button>
                            <div className="size-10 bg-secondary/10 rounded-xl flex items-center justify-center text-secondary mb-4 pointer-events-none group-hover:rotate-12 transition-transform">
                                <BookOpen size={18}/>
                            </div>
                            <h3 className="text-xl font-black mb-2 text-slate-900 leading-tight group-hover:text-secondary transition-colors">{exam.title}</h3>
                            <p className="text-xs text-slate-500 font-medium mb-6 line-clamp-2">{exam.description || 'Test your skills in this comprehensive assessment.'}</p>
                            
                            <div className="mt-auto flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-400 border-t border-slate-100 pt-4">
                                <span><Calendar size={12} className="inline mr-1 text-secondary"/> {exam.examDate ? new Date(exam.examDate).toLocaleDateString() : 'TBD'}</span>
                                <span className={exam.published ? 'text-emerald-500' : 'text-slate-400'}>{exam.published ? 'Published' : 'Draft'}</span>
                            </div>
                        </div>
                    ))}
                    {exams.length === 0 && <div className="col-span-full py-12 text-center text-slate-400 font-bold bg-white rounded-[3rem] border border-slate-100 shadow-sm">No upcoming exams. Students will see placeholder data until exams are added.</div>}
                </div>
            </section>

            {/* AD POSTER MODAL */}
            <AnimatePresence>
                {isAdModalOpen && (
                    <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto"
                    >
                        <motion.div 
                            initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
                            className="bg-white rounded-[3rem] p-10 w-full max-w-4xl shadow-2xl relative my-8 border border-white"
                        >
                            <button onClick={() => setIsAdModalOpen(false)} className="absolute top-8 right-8 p-3 bg-slate-50 text-slate-400 hover:text-slate-900 rounded-2xl transition-colors hover:bg-slate-100">
                                <X size={24} />
                            </button>
                            
                            <h2 className="text-4xl font-black text-slate-900 mb-2 tracking-tight">Build New Poster</h2>
                            <p className="text-slate-500 font-bold mb-10 text-lg">Add a stunning new hero poster to the student dashboard.</p>

                            <form onSubmit={handleCreateAd} className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Poster Title</label>
                                            <input required type="text" value={adFormData.title} onChange={e => setAdFormData({...adFormData, title: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-slate-900 font-bold outline-none focus:border-primary transition-all" placeholder="e.g. Masterclass Series 2026" />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Description</label>
                                            <textarea required rows={4} value={adFormData.description} onChange={e => setAdFormData({...adFormData, description: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-slate-900 font-medium outline-none focus:border-primary transition-all resize-none" placeholder="Write engaging copy here..." />
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Background Image Upload</label>
                                            <input type="file" accept="image/*" onChange={e => e.target.files && setImageFile(e.target.files[0])} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-slate-600 font-bold outline-none transition-all file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border file:border-primary/20 file:text-sm file:font-black file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer" />
                                            {imageFile && <p className="text-[10px] font-black text-emerald-500 mt-2 ml-2 uppercase tracking-widest animate-pulse">Image Attached Ready for Upload</p>}
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Button Text</label>
                                                <input type="text" value={adFormData.buttonText} onChange={e => setAdFormData({...adFormData, buttonText: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-slate-900 font-bold outline-none focus:border-primary transition-all" placeholder="e.g. Enroll Now" />
                                            </div>
                                            <div>
                                                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Link to Exam (Optional)</label>
                                                <select 
                                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-slate-600 font-bold outline-none focus:border-primary transition-all appearance-none cursor-pointer hover:bg-slate-100"
                                                    onChange={e => {
                                                        const examId = e.target.value;
                                                        if(examId) {
                                                            setAdFormData({...adFormData, redirectLink: `/student/exams/${examId}`, buttonText: adFormData.buttonText || 'Enroll Now'});
                                                        }
                                                    }}
                                                >
                                                    <option value="">-- No Exam Link --</option>
                                                    {exams.map(ex => <option key={ex.id} value={ex.id}>{ex.title}</option>)}
                                                </select>
                                                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mt-2 ml-2">Auto-fills redirect path</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-8 border-t border-slate-100">
                                    <button type="submit" className="w-full py-5 premium-gradient text-white rounded-2xl font-black text-lg tracking-tight hover:scale-[1.02] transition-transform flex items-center justify-center gap-2 shadow-2xl shadow-primary/20">
                                        Publish Hero Poster <ImageIcon size={20} />
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* UPCOMING EXAM MODAL */}
            <AnimatePresence>
                {isExamModalOpen && (
                    <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto"
                    >
                        <motion.div 
                            initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
                            className="bg-white rounded-[3rem] p-10 w-full max-w-2xl shadow-2xl relative my-8 border border-white"
                        >
                            <button onClick={() => setIsExamModalOpen(false)} className="absolute top-6 right-6 p-2 bg-slate-50 text-slate-400 hover:text-slate-900 rounded-xl transition-colors">
                                <X size={20} />
                            </button>
                            
                            <h2 className="text-3xl font-black text-slate-900 mb-2">Initialize Exam Event</h2>
                            <p className="text-slate-500 font-bold mb-8">Publish a new exam node to the student dashboard.</p>

                            <form onSubmit={handleCreateExam} className="space-y-6">
                                <div>
                                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Exam Title</label>
                                    <input required type="text" value={examFormData.title} onChange={e => setExamFormData({...examFormData, title: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-slate-900 font-bold outline-none focus:border-secondary transition-all" placeholder="e.g. Midterm 2026 CS 101" />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Description Focus</label>
                                    <textarea required rows={3} value={examFormData.description} onChange={e => setExamFormData({...examFormData, description: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-slate-900 font-medium outline-none focus:border-secondary transition-all resize-none" placeholder="Syllabus coverage..." />
                                </div>
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Date Time</label>
                                        <input required type="datetime-local" value={examFormData.examDate} onChange={e => setExamFormData({...examFormData, examDate: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-slate-900 font-bold outline-none focus:border-secondary transition-all" />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Duration (Min)</label>
                                        <input required type="number" min="1" value={examFormData.duration} onChange={e => setExamFormData({...examFormData, duration: parseInt(e.target.value)})} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-slate-900 font-bold outline-none focus:border-secondary transition-all" />
                                    </div>
                                </div>
                                <div className="pt-6">
                                    <button type="submit" className="w-full py-4 bg-secondary text-white rounded-2xl font-black text-lg hover:bg-secondary/90 transition-all flex items-center justify-center gap-2 shadow-xl shadow-secondary/30">
                                        Release Timeline Event <BookOpen size={20} />
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
