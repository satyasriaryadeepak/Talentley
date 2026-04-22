"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
    Users, 
    Search, 
    Filter, 
    Download, 
    UserPlus, 
    MoreVertical, 
    Mail, 
    Phone, 
    CheckCircle2, 
    XCircle,
    GraduationCap,
    Sparkles,
    Activity
} from 'lucide-react';

export default function StudentsManagement() {
    const [students, setStudents] = useState<any[]>([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/students')
            .then(res => res.json())
            .then(data => {
                const mapped = data.map((student: any) => ({
                    id: student.id,
                    name: student.name,
                    class: student.Class?.name || 'Unassigned',
                    email: student.email || student.studentId + '@example.com',
                    phone: '+91 98765 43210', // Mock data
                    status: 'active',
                    joined: new Date(student.createdAt).toLocaleDateString()
                }));
                setStudents(mapped);
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
            className="space-y-12 pb-20 pt-6"
        >
            <motion.header variants={itemVariants} className="flex flex-col md:flex-row md:items-center justify-between gap-10">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight flex items-center">
                        Registry Core <Sparkles className="ml-4 text-primary animate-pulse" size={32} />
                    </h1>
                    <div className="flex items-center gap-3 mt-4">
                        <div className="size-1.5 bg-primary rounded-full animate-ping"></div>
                        <p className="text-[11px] text-slate-400 font-black uppercase tracking-[0.25em] opacity-80">Connected to Education Mainframe • Active Residency Cycle</p>
                    </div>
                </div>
                <div className="flex items-center gap-5">
                    <button className="bg-white/60 backdrop-blur-xl text-slate-500 border border-white/50 p-5 rounded-[1.5rem] hover:bg-white hover:text-primary transition-all duration-500 shadow-sm group">
                        <Download size={22} className="group-hover:-translate-y-1 transition-transform" />
                    </button>

                </div>
            </motion.header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {[
                    { label: 'Total Enrolled', value: '12,482', icon: GraduationCap, color: 'orange' },
                    { label: 'Active Today', value: '4,210', icon: CheckCircle2, color: 'green' },
                    { label: 'Pending Access', value: '128', icon: Activity, color: 'indigo' }
                ].map((stat, i) => (
                    <motion.div 
                        key={i}
                        variants={itemVariants}
                        className="bg-white/40 backdrop-blur-3xl p-10 rounded-[2.5rem] border border-white/50 flex items-center gap-8 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-700 group relative overflow-hidden"
                    >
                        {/* Background Glow */}
                        <div className={`absolute -top-16 -right-16 size-32 blur-[60px] opacity-0 group-hover:opacity-20 transition-opacity duration-700 ${
                            stat.color === 'orange' ? 'bg-primary' : stat.color === 'green' ? 'bg-green-500' : 'bg-indigo-500'
                        }`} />

                         <div className={`w-20 h-20 rounded-[1.75rem] flex items-center justify-center text-white shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 ring-4 ring-white/50 ${
                            stat.color === 'orange' ? 'bg-primary shadow-primary/30' : 
                            stat.color === 'green' ? 'bg-green-500 shadow-green-500/30' : 'bg-slate-900 shadow-slate-900/30'
                         }`}>
                            <stat.icon size={32} />
                         </div>
                         <div className="relative z-10">
                            <h3 className="text-3xl font-black text-slate-900 tracking-tight tabular-nums">{stat.value}</h3>
                            <p className="text-slate-400 font-black text-[10px] uppercase tracking-[0.25em] mt-2 opacity-70 group-hover:text-slate-600 transition-colors">{stat.label}</p>
                         </div>
                    </motion.div>
                ))}
            </div>

            <motion.div 
                variants={itemVariants}
                className="bg-white/40 backdrop-blur-3xl rounded-[3rem] border border-white/50 overflow-hidden shadow-xl shadow-slate-200/20"
            >
                 <div className="p-12 border-b border-white/40 flex flex-col xl:flex-row xl:items-center justify-between gap-12">
                    <div className="flex gap-4 overflow-x-auto pb-4 xl:pb-0 custom-scrollbar">
                        {['All Records', 'Active', 'Staged', 'Class 10', 'Class 09'].map((filter, i) => (
                            <button key={i} className={`px-10 py-4 rounded-[1.5rem] font-black text-[10px] uppercase tracking-[0.25em] transition-all duration-500 whitespace-nowrap ${i === 0 ? 'bg-slate-900 text-white shadow-2xl shadow-slate-900/10' : 'bg-white/60 text-slate-400 hover:text-slate-900 border border-white/50 hover:bg-white hover:shadow-lg'}`}>
                                {filter}
                            </button>
                        ))}
                    </div>
                    <div className="relative group">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors duration-300" size={20} />
                        <input 
                            type="text" 
                            placeholder="Fetch entry logs..." 
                            className="bg-white/60 border border-white/50 rounded-[1.5rem] pl-16 pr-8 py-5 w-full xl:w-96 outline-none focus:ring-[15px] focus:ring-primary/5 focus:bg-white focus:border-primary/20 transition-all font-bold text-[15px] shadow-inner placeholder:text-slate-300" 
                        />
                    </div>
                 </div>

                 <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50/20 text-slate-400 font-black text-[10px] uppercase tracking-[0.3em]">
                            <tr>
                                <th className="px-12 py-8">Candidate Profile</th>
                                <th className="px-12 py-8">Communication Nodes</th>
                                <th className="px-12 py-8">Status Protocol</th>
                                <th className="px-12 py-8">Log Timestamp</th>
                                <th className="px-12 py-8 text-right">Operations</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/20">
                            {students.map((student, i) => (
                                <tr key={student.id} className="hover:bg-white/60 transition-all duration-500 group">
                                    <td className="px-12 py-12">
                                        <div className="flex items-center gap-7">
                                            <div className="size-16 bg-white rounded-[1.5rem] flex items-center justify-center text-primary font-black text-2xl shadow-2xl shadow-slate-200/50 border border-slate-50 transition-all duration-700 group-hover:scale-110 group-hover:rotate-3 group-hover:bg-primary group-hover:text-white group-hover:shadow-primary/30">
                                                {student.name.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="font-black text-slate-900 text-xl leading-none mb-3 group-hover:text-primary transition-colors">{student.name}</div>
                                                <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] opacity-80 group-hover:opacity-100 transition-opacity italic">{student.class} • Academy Division</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-12 py-12">
                                        <div className="space-y-3">
                                            <div className="flex items-center text-sm font-bold text-slate-500 group-hover:text-slate-700 transition-colors">
                                                <Mail size={16} className="mr-4 text-slate-300 group-hover:text-primary" /> {student.email}
                                            </div>
                                            <div className="flex items-center text-sm font-bold text-slate-500 group-hover:text-slate-700 transition-colors">
                                                <Phone size={16} className="mr-4 text-slate-300 group-hover:text-primary" /> {student.phone}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-12 py-12">
                                        <span className={`inline-flex items-center px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.25em] shadow-sm ring-1 ring-white/50 group-hover:scale-105 transition-transform ${
                                            student.status === 'active' ? 'bg-green-100/50 text-green-600' : 'bg-rose-100/50 text-rose-500'
                                        }`}>
                                            <div className={`size-2 rounded-full mr-3 animate-pulse ${student.status === 'active' ? 'bg-green-500' : 'bg-rose-500'}`}></div>
                                            {student.status}
                                        </span>
                                    </td>
                                    <td className="px-12 py-12 text-[11px] font-black text-slate-400 uppercase tracking-widest opacity-70 group-hover:opacity-100 transition-opacity">
                                        {student.joined}
                                    </td>
                                    <td className="px-12 py-12 text-right">
                                        <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                            <button className="size-12 bg-white rounded-2xl flex items-center justify-center text-slate-400 hover:text-primary hover:shadow-xl transition-all duration-300 border border-slate-100"><MoreVertical size={20} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                 </div>
            </motion.div>
        </motion.div>
    );
}
