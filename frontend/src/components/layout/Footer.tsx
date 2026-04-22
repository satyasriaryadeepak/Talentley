"use client";
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Sparkles } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-slate-900 border-t border-slate-800 pt-24 pb-12 overflow-hidden relative">
            <div className="blob bottom-0 left-0 bg-primary/10 opacity-30"></div>
            
            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1 lg:col-span-1">
                        <Link href="/" className="flex items-center space-x-2 mb-6">
                             <div className="w-10 h-10 premium-gradient rounded-xl flex items-center justify-center shadow-lg">
                                 <Sparkles className="text-white w-6 h-6" />
                             </div>
                            <span className="text-2xl font-black tracking-tighter text-white">Talentley<span className="text-primary text-4xl">.</span></span>
                        </Link>
                        <p className="text-sm text-slate-400 leading-relaxed mb-8">
                            Bridging the gap between potential and recognition. We empower students across the nation to discover their true talents through competitive assessment.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6">Quick Links</h4>
                        <ul className="flex flex-col gap-4 text-sm">
                            {['How it Works', 'Exam Schedule', 'Preparation Material', 'Success Stories', 'Privacy Policy'].map((item) => (
                                <li key={item}>
                                    <Link href="#" className="text-slate-400 hover:text-primary transition-colors">{item}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6">Support</h4>
                        <ul className="flex flex-col gap-4 text-sm">
                            {['Help Center', 'Contact Us', 'Technical Requirements', 'FAQS'].map((item) => (
                                <li key={item}>
                                    <Link href="#" className="text-slate-400 hover:text-white transition-colors">{item}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6">Stay Updated</h4>
                        <p className="text-sm text-slate-400 mb-6">Subscribe to our newsletter for latest news on competitions.</p>
                        <div className="flex flex-col gap-3">
                            <input 
                                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary" 
                                placeholder="Your email address" 
                                type="email"
                            />
                            <button className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-primary/90 transition-all">
                                Subscribe Now
                            </button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-slate-800 pt-12 flex flex-col md:flex-row justify-between items-center text-slate-500 font-medium tracking-tight">
                    <p>© 2026 Talentley School. All rights reserved.</p>
                    <div className="flex space-x-8 mt-6 md:mt-0">
                        <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
                        <Link href="#" className="hover:text-white transition-colors">Terms</Link>
                        <Link href="#" className="hover:text-white transition-colors">Cookies</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
