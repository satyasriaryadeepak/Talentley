"use client";
import { motion } from 'framer-motion';
import { Target, Eye, ShieldCheck, Sparkles, Rocket, Heart, ArrowRight } from 'lucide-react';

export default function AboutPage() {
    const values = [
        { title: 'Excellence', desc: 'We strive for perfection in every assessment and digital interaction.', icon: ShieldCheck },
        { title: 'Innovation', desc: 'Utilizing cutting-edge tech to identify and nurture raw talent.', icon: Rocket },
        { title: 'Integrity', desc: 'Absolute transparency and fairness in our ranking systems.', icon: Heart },
    ];

    return (
        <div className="min-h-screen pt-32 pb-20 bg-white relative overflow-hidden">
            <div className="blob top-0 left-0"></div>
            <div className="blob bottom-0 right-0 bg-secondary/5" style={{ animationDelay: '3s' }}></div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Hero Section */}
                <div className="text-center max-w-4xl mx-auto mb-32">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center space-x-2 py-2 px-4 rounded-full bg-blue-50 border border-blue-100 text-primary font-bold text-xs mb-8"
                    >
                        <Sparkles className="w-4 h-4" />
                        <span>OUR JOURNEY SINCE 2024</span>
                    </motion.div>
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-7xl font-black text-slate-900 mb-8 tracking-tighter"
                    >
                        Pioneering the Future of <span className="text-gradient">Talent Discovery</span>
                    </motion.h1>
                    <p className="text-slate-500 text-2xl font-medium leading-relaxed">
                        Talentley is more than just an exam platform. We are a digital ecosystem dedicated to identifying, encouraging, and rewarding brilliance in every student.
                    </p>
                </div>

                {/* Mission & Vision Bento */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-32">
                    <motion.div 
                        whileHover={{ y: -10 }}
                        className="bg-slate-900 rounded-[3.5rem] p-12 text-white relative overflow-hidden group shadow-2xl"
                    >
                        <div className="absolute top-0 right-0 p-12 opacity-5 translate-x-4 -translate-y-4">
                            <Target size={200} />
                        </div>
                        <Target className="text-primary mb-8" size={64} />
                        <h2 className="text-4xl font-black mb-6 tracking-tight">Our Mission</h2>
                        <p className="text-slate-400 text-xl font-medium leading-relaxed">
                            To bridge the gap between effort and recognition by providing a fair, transparent, and high-performance digital examination platform for students nationwide.
                        </p>
                    </motion.div>

                    <motion.div 
                         whileHover={{ y: -10 }}
                         className="bg-white rounded-[3.5rem] p-12 border border-slate-100 relative overflow-hidden group shadow-xl"
                    >
                         <div className="blob bg-primary/5 -top-20 -right-20"></div>
                         <Eye className="text-secondary mb-8" size={64} />
                         <h2 className="text-4xl font-black mb-6 tracking-tight text-slate-900">Our Vision</h2>
                         <p className="text-slate-500 text-xl font-medium leading-relaxed">
                            Creating a world where every talented student, regardless of their background, has access to opportunities that can propel their academic and professional careers.
                         </p>
                    </motion.div>
                </div>

                {/* Core Values */}
                <div className="text-center mb-16">
                    <h3 className="text-3xl font-black text-slate-900 tracking-tight">The Values That Drive Us</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
                    {values.map((v, i) => (
                        <div key={i} className="glass-card p-10 rounded-[3rem] border-white hover:bg-white transition-all duration-500 hover:shadow-2xl text-center group">
                            <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-primary mx-auto mb-6 group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                                <v.icon size={32} />
                            </div>
                            <h4 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">{v.title}</h4>
                            <p className="text-slate-500 font-medium leading-relaxed">{v.desc}</p>
                        </div>
                    ))}
                </div>

                {/* FAQ / CTA */}
                <div className="premium-gradient rounded-[4rem] p-16 text-center text-white relative overflow-hidden shadow-3xl">
                    <div className="absolute inset-0 bg-white/5 backdrop-blur-[2px]"></div>
                    <div className="relative z-10">
                        <h2 className="text-5xl font-black mb-8 tracking-tighter">Ready to showcase your talent?</h2>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <button className="px-10 py-5 bg-white text-primary rounded-3xl font-black text-lg hover:scale-105 transition-transform shadow-2xl flex items-center">
                                Join Talentley Now <ArrowRight className="ml-2" />
                            </button>
                            <button className="px-10 py-5 bg-slate-900/20 text-white border border-white/20 rounded-3xl font-black text-lg hover:bg-slate-900/30 transition-all">
                                View Past Winners
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
