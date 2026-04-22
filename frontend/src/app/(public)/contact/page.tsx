"use client";
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Facebook, Twitter, Instagram, Linkedin, Sparkles } from 'lucide-react';

export default function ContactPage() {
    return (
        <div className="min-h-screen pt-32 pb-20 bg-[#fbfdff] relative overflow-hidden">
            <div className="blob top-0 right-0 animate-pulse-slow"></div>
            <div className="blob bottom-0 left-0 bg-primary/5"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center space-x-2 py-2 px-4 rounded-full bg-blue-50 border border-blue-100 text-primary font-bold text-xs mb-6"
                    >
                        <Mail className="w-4 h-4" />
                        <span>WE'RE HERE TO HELP</span>
                    </motion.div>
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-6xl font-black text-slate-900 mb-6 tracking-tight"
                    >
                        Get in <span className="text-gradient">Touch</span>
                    </motion.h1>
                    <p className="text-slate-500 text-xl font-medium leading-relaxed">
                        Have questions about the assessments or prize announcements? Our team is available 24/7 to assist you.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                    {/* Contact Info Cards */}
                    <div className="lg:col-span-4 space-y-8">
                        {[
                            { icon: MapPin, title: 'Visit Us', detail: '123 Talent Lane, Achievement City', color: 'primary' },
                            { icon: Phone, title: 'Call Center', detail: '+1 (234) 567-890', color: 'secondary' },
                            { icon: Mail, title: 'Email Support', detail: 'hello@talentley.com', color: 'indigo' },
                        ].map((item, i) => (
                            <motion.div 
                                key={i}
                                whileHover={{ x: 10 }}
                                className="glass-card p-8 rounded-[2.5rem] border-white flex items-center space-x-6 hover:shadow-xl transition-all"
                            >
                                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg ${
                                    item.color === 'primary' ? 'bg-primary' : item.color === 'secondary' ? 'bg-secondary' : 'bg-indigo-600'
                                }`}>
                                    <item.icon size={28} />
                                </div>
                                <div>
                                    <h3 className="font-black text-slate-900 tracking-tight">{item.title}</h3>
                                    <p className="text-slate-500 font-medium">{item.detail}</p>
                                </div>
                            </motion.div>
                        ))}

                        <div className="p-10 bg-slate-900 rounded-[3rem] text-white overflow-hidden relative group">
                            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity rotate-12">
                                <Sparkles size={80} />
                            </div>
                            <h3 className="text-xl font-black mb-6 tracking-tight relative z-10 text-white">Follow Our Community</h3>
                            <div className="flex space-x-4 relative z-10">
                                {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                                    <button key={i} className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center hover:bg-primary transition-all duration-300 backdrop-blur-md">
                                        <Icon size={20} />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-8">
                        <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-white rounded-[3.5rem] p-12 lg:p-16 border border-slate-100 shadow-3xl"
                        >
                            <form className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-sm font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                                        <input type="text" placeholder="John Doe" className="w-full px-8 py-5 bg-slate-50 border-none rounded-2xl outline-none focus:ring-4 focus:ring-primary/10 transition-all font-bold text-slate-900 shadow-sm" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                                        <input type="email" placeholder="john@example.com" className="w-full px-8 py-5 bg-slate-50 border-none rounded-2xl outline-none focus:ring-4 focus:ring-primary/10 transition-all font-bold text-slate-900 shadow-sm" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-black text-slate-400 uppercase tracking-widest ml-1">Subject</label>
                                    <input type="text" placeholder="How can we help?" className="w-full px-8 py-5 bg-slate-50 border-none rounded-2xl outline-none focus:ring-4 focus:ring-primary/10 transition-all font-bold text-slate-900 shadow-sm" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-black text-slate-400 uppercase tracking-widest ml-1">Message</label>
                                    <textarea rows={5} placeholder="Write your message here..." className="w-full px-8 py-5 bg-slate-50 border-none rounded-2xl outline-none focus:ring-4 focus:ring-primary/10 transition-all font-bold text-slate-900 shadow-sm resize-none"></textarea>
                                </div>
                                <motion.button 
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="button"
                                    className="w-full py-6 premium-gradient text-white rounded-[2rem] font-black text-xl shadow-2xl shadow-primary/30 flex items-center justify-center space-x-3 group"
                                >
                                    <span>Send Message</span>
                                    <Send size={24} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </motion.button>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
