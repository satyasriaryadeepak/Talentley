"use client";
import { motion } from 'framer-motion';
import { 
    Settings, 
    Save, 
    Globe, 
    Shield, 
    Bell, 
    Palette, 
    Smartphone,
    Phone,
    Image as ImageIcon
} from 'lucide-react';

export default function SettingsPage() {
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
                        Platform Core <Settings className="ml-4 text-primary animate-spin-slow" size={32} />
                    </h1>
                    <div className="flex items-center gap-3 mt-4">
                        <div className="size-1.5 bg-primary rounded-full animate-ping"></div>
                        <p className="text-[11px] text-slate-400 font-black uppercase tracking-[0.25em] opacity-80">System Configuration Nexus • Build v4.2.0</p>
                    </div>
                </div>
                <button className="bg-slate-900 text-white px-10 py-5 rounded-[1.5rem] font-black text-xs uppercase tracking-[0.25em] shadow-xl shadow-slate-900/10 flex items-center gap-4 hover:bg-primary hover:scale-105 hover:shadow-primary/30 active:scale-95 transition-all duration-700 group">
                    <Save size={20} className="group-hover:rotate-12 transition-transform" />
                    <span>Sync Changes</span>
                </button>
            </motion.header>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                {/* Navigation */}
                <motion.aside variants={itemVariants} className="lg:col-span-1 space-y-4">
                    {[
                        { label: 'General Nexus', icon: Globe, active: true },
                        { label: 'Visual Engine', icon: Palette, active: false },
                        { label: 'Security Layer', icon: Shield, active: false },
                        { label: 'Signal Feed', icon: Bell, active: false },
                        { label: 'External Nodes', icon: Smartphone, active: false },
                    ].map((item, i) => (
                        <button key={i} className={`w-full flex items-center justify-between p-6 rounded-[1.5rem] font-black text-[10px] uppercase tracking-[0.25em] transition-all duration-500 overflow-hidden relative group ${item.active ? 'bg-slate-900 text-white shadow-2xl shadow-slate-900/10' : 'bg-white/40 text-slate-400 hover:bg-white hover:text-slate-900 border border-white/50'}`}>
                            <div className="flex items-center gap-4 relative z-10">
                                <item.icon size={18} className={`${item.active ? 'text-primary' : 'group-hover:text-primary'} transition-colors duration-300`} />
                                <span>{item.label}</span>
                            </div>
                            {item.active && <div className="size-1.5 bg-primary rounded-full relative z-10"></div>}
                            {item.active && <div className="absolute top-0 right-0 w-1 h-full bg-primary"></div>}
                        </button>
                    ))}
                </motion.aside>

                {/* Main Settings Form */}
                <div className="lg:col-span-3 space-y-12">
                     <motion.section 
                        variants={itemVariants}
                        className="bg-white/40 backdrop-blur-3xl p-12 rounded-[3.5rem] border border-white/50 shadow-xl shadow-slate-200/10 space-y-12 relative overflow-hidden"
                     >
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
                        
                        <div className="flex items-center gap-5">
                            <div className="size-14 bg-white rounded-2xl flex items-center justify-center text-primary shadow-xl shadow-slate-200/40 border border-slate-50 rotate-3 group-hover:rotate-0 transition-transform">
                                <Globe size={26} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black text-slate-900 tracking-tight">Enterprise Identity</h2>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1 opacity-70">Core Branding & Nomenclature</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div className="space-y-4">
                                <label className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-400 ml-2 italic">Platform Designation</label>
                                <input type="text" placeholder="Talentley School" className="w-full px-8 py-5 bg-white/60 border border-white/50 rounded-[1.5rem] focus:ring-[15px] focus:ring-primary/5 focus:bg-white focus:border-primary/20 transition-all font-bold text-[15px] outline-none shadow-inner placeholder:text-slate-300" />
                            </div>
                            <div className="space-y-4">
                                <label className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-400 ml-2 italic">Global Tagline</label>
                                <input type="text" placeholder="Discover the Genius Within" className="w-full px-8 py-5 bg-white/60 border border-white/50 rounded-[1.5rem] focus:ring-[15px] focus:ring-primary/5 focus:bg-white focus:border-primary/20 transition-all font-bold text-[15px] outline-none shadow-inner placeholder:text-slate-300" />
                            </div>
                        </div>

                        <div className="space-y-8">
                             <div className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-400 ml-2 italic">Monogram & Emblem</div>
                             <div className="flex items-center gap-10">
                                <div className="size-32 bg-white rounded-[2.5rem] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-300 shadow-inner group hover:border-primary transition-colors cursor-pointer relative overflow-hidden">
                                     <ImageIcon size={32} className="group-hover:scale-110 transition-transform" />
                                     <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                </div>
                                <div className="space-y-4">
                                    <button className="bg-slate-900 text-white px-8 py-4 rounded-[1.25rem] font-black text-[10px] uppercase tracking-widest hover:bg-primary transition-all duration-500 shadow-xl shadow-slate-900/10">Synchronize Asset</button>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest opacity-60">High-fidelity SVG or PNG • Resolution 1024x1024px</p>
                                </div>
                             </div>
                        </div>
                    </motion.section>

                    <motion.section 
                        variants={itemVariants}
                        className="bg-white/40 backdrop-blur-3xl p-12 rounded-[3.5rem] border border-white/50 shadow-xl shadow-slate-200/10 space-y-12 relative overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
                        
                        <div className="flex items-center gap-5">
                            <div className="size-14 bg-white rounded-2xl flex items-center justify-center text-primary shadow-xl shadow-slate-200/40 border border-slate-50 -rotate-3 group-hover:rotate-0 transition-transform">
                                <Phone size={26} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black text-slate-900 tracking-tight">Terminal Coordinates</h2>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1 opacity-70">Public Reach & Node Locations</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div className="space-y-4">
                                <label className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-400 ml-2 italic">Mainline Email</label>
                                <input type="email" placeholder="nexus@talentley.com" className="w-full px-8 py-5 bg-white/60 border border-white/50 rounded-[1.5rem] focus:ring-[15px] focus:ring-primary/5 focus:bg-white focus:border-primary/20 transition-all font-bold text-[15px] outline-none shadow-inner placeholder:text-slate-300" />
                            </div>
                            <div className="space-y-4">
                                <label className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-400 ml-2 italic">Support Hotline</label>
                                <input type="text" placeholder="+91 98765 43210" className="w-full px-8 py-5 bg-white/60 border border-white/50 rounded-[1.5rem] focus:ring-[15px] focus:ring-primary/5 focus:bg-white focus:border-primary/20 transition-all font-bold text-[15px] outline-none shadow-inner placeholder:text-slate-300" />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-400 ml-2 italic">Base of Operations</label>
                            <textarea rows={3} placeholder="Talentley Citadel, Level 42, Achievement Sector..." className="w-full px-8 py-5 bg-white/60 border border-white/50 rounded-[1.5rem] focus:ring-[15px] focus:ring-primary/5 focus:bg-white focus:border-primary/20 transition-all font-bold text-[15px] outline-none shadow-inner placeholder:text-slate-300 resize-none"></textarea>
                        </div>
                    </motion.section>
                </div>
            </div>
        </motion.div>
    );
}
