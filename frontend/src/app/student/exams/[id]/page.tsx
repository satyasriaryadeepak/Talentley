"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Clock, 
    ChevronLeft, 
    ChevronRight, 
    Flag, 
    CheckCircle2, 
    Info,
    AlertCircle,
    Maximize2,
    Settings2,
    Sparkles
} from 'lucide-react';

export default function OnlineExamPage() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [timeLeft, setTimeLeft] = useState(3600); // 60 minutes
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [flagged, setFlagged] = useState<number[]>([]);

    const questions = [
        { id: 1, text: "If a car travels 60 miles per hour, how many miles will it travel in 2.5 hours?", options: ["120 miles", "140 miles", "150 miles", "160 miles"] },
        { id: 2, text: "What is the chemical symbol for gold?", options: ["Ag", "Au", "Fe", "Cu"] },
        { id: 3, text: "Which planet is known as the Red Planet?", options: ["Venus", "Mars", "Jupiter", "Saturn"] },
        // ... more mock questions
    ];

    const toggleFlag = (id: number) => {
        setFlagged(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    };

    const handleAnswer = (option: string) => {
        setAnswers(prev => ({ ...prev, [questions[currentQuestion].id]: option }));
    };

    return (
        <div className="min-h-screen bg-[#0f172a] text-slate-300 flex flex-col font-sans">
            {/* Ultra-Premium Exam Header */}
            <header className="h-24 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-10 relative z-20">
                <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 premium-gradient rounded-xl flex items-center justify-center text-white shadow-lg">
                            <Sparkles size={20} />
                        </div>
                        <h1 className="text-xl font-black text-white tracking-tight">Physics Olympiad <span className="text-slate-500 font-bold ml-2">Class 10</span></h1>
                    </div>
                    <div className="h-6 w-[1px] bg-slate-800 mx-4" />
                    <div className="flex items-center space-x-2 text-slate-400 font-bold text-sm bg-slate-800/50 p-2 px-4 rounded-xl">
                        <Info size={16} />
                        <span>Section A: Multiple Choice</span>
                    </div>
                </div>

                <div className="flex items-center space-x-8">
                    <div className="flex flex-col items-end">
                        <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Time Remaining</div>
                        <div className={`text-3xl font-black tracking-tighter flex items-center ${timeLeft < 300 ? 'text-red-500 animate-pulse' : 'text-secondary'}`}>
                            <Clock size={24} className="mr-2" />
                            {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                        </div>
                    </div>
                    <button className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-xl font-black shadow-lg shadow-red-500/20 transition-all hover:scale-105">
                        Finish Exam
                    </button>
                </div>
            </header>

            <div className="flex flex-grow overflow-hidden relative">
                {/* Background Blobs for Atmosphere */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[120px] pointer-events-none" />

                {/* Question Area */}
                <main className="flex-grow p-12 overflow-y-auto relative z-10">
                    <div className="max-w-4xl mx-auto space-y-12">
                        {/* Progress Bar */}
                        <div className="space-y-3">
                            <div className="flex justify-between items-end">
                                <span className="text-sm font-black text-slate-500 uppercase tracking-widest">Progress</span>
                                <span className="text-lg font-black text-white">{Object.keys(answers).length} / {questions.length} Solved</span>
                            </div>
                            <div className="h-3 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                                <motion.div 
                                    className="h-full premium-gradient"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(Object.keys(answers).length / questions.length) * 100}%` }}
                                />
                            </div>
                        </div>

                        {/* Question Card */}
                        <motion.div 
                            key={currentQuestion}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-slate-900 border border-slate-800 p-12 rounded-[3rem] shadow-2xl shadow-black/40 relative group"
                        >
                            <div className="flex items-start justify-between mb-8">
                                <div className="text-sm font-black text-primary p-2 px-4 bg-primary/10 rounded-xl border border-primary/20">
                                    QUESTION {currentQuestion + 1}
                                </div>
                                <button 
                                    onClick={() => toggleFlag(questions[currentQuestion].id)}
                                    className={`flex items-center space-x-2 font-bold text-sm transition-colors ${flagged.includes(questions[currentQuestion].id) ? 'text-orange-500' : 'text-slate-600 hover:text-slate-400'}`}
                                >
                                    <Flag size={18} fill={flagged.includes(questions[currentQuestion].id) ? 'currentColor' : 'none'} />
                                    <span>{flagged.includes(questions[currentQuestion].id) ? 'Flagged for Preview' : 'Flag Question'}</span>
                                </button>
                            </div>

                            <h2 className="text-3xl font-black text-white mb-12 leading-tight tracking-tight">
                                {questions[currentQuestion].text}
                            </h2>

                            <div className="grid grid-cols-1 gap-4">
                                {questions[currentQuestion].options.map((option, i) => (
                                    <button 
                                        key={i}
                                        onClick={() => handleAnswer(option)}
                                        className={`p-6 rounded-2xl text-left font-bold text-lg border-2 transition-all flex items-center justify-between group ${
                                            answers[questions[currentQuestion].id] === option 
                                            ? 'border-primary bg-primary/10 text-white shadow-lg shadow-primary/10' 
                                            : 'border-slate-800 bg-slate-800/50 text-slate-400 hover:border-slate-700 hover:bg-slate-800'
                                        }`}
                                    >
                                        <div className="flex items-center">
                                            <span className={`w-10 h-10 rounded-xl flex items-center justify-center mr-4 transition-colors ${
                                                answers[questions[currentQuestion].id] === option ? 'bg-primary text-white' : 'bg-slate-700 text-slate-400 group-hover:bg-slate-600'
                                            }`}>
                                                {String.fromCharCode(65 + i)}
                                            </span>
                                            {option}
                                        </div>
                                        {answers[questions[currentQuestion].id] === option && <CheckCircle2 className="text-primary" />}
                                    </button>
                                ))}
                            </div>
                        </motion.div>

                        {/* Navigation */}
                        <div className="flex justify-between items-center">
                            <button 
                                disabled={currentQuestion === 0}
                                onClick={() => setCurrentQuestion(prev => prev - 1)}
                                className="flex items-center space-x-2 px-8 py-4 bg-slate-800 rounded-2xl font-black disabled:opacity-30 hover:bg-slate-700 transition-colors"
                            >
                                <ChevronLeft size={20} />
                                <span>Previous Question</span>
                            </button>
                            <button 
                                onClick={() => {
                                    if (currentQuestion < questions.length - 1) {
                                        setCurrentQuestion(prev => prev + 1);
                                    }
                                }}
                                className="flex items-center space-x-2 px-10 py-4 premium-gradient text-white rounded-2xl font-black shadow-lg shadow-primary/20 hover:scale-105 transition-all"
                            >
                                <span>{currentQuestion === questions.length - 1 ? 'Exam Summary' : 'Next Question'}</span>
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    </div>
                </main>

                {/* Question Palette (Sidebar) */}
                <aside className="w-96 bg-slate-900 border-l border-slate-800 flex flex-col p-8 relative z-20">
                    <h3 className="text-xl font-black text-white mb-8 flex items-center tracking-tight">
                        <CheckCircle2 className="mr-3 text-secondary" size={24} /> Question Palette
                    </h3>
                    
                    <div className="grid grid-cols-4 gap-3 mb-12">
                        {questions.map((q, i) => (
                            <button 
                                key={q.id}
                                onClick={() => setCurrentQuestion(i)}
                                className={`h-14 rounded-xl font-black flex items-center justify-center transition-all border-2 ${
                                    currentQuestion === i ? 'border-primary ring-4 ring-primary/20 scale-110 shadow-lg' :
                                    flagged.includes(q.id) ? 'bg-orange-500/20 border-orange-500 text-orange-500' :
                                    answers[q.id] ? 'bg-green-500/20 border-green-500 text-green-500' :
                                    'bg-slate-800 border-slate-700 text-slate-500 hover:bg-slate-700'
                                }`}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>

                    <div className="mt-auto space-y-4 bg-slate-800/30 p-6 rounded-[2rem] border border-slate-800">
                        <h4 className="text-sm font-black text-slate-500 uppercase tracking-widest flex items-center">
                            <AlertCircle size={14} className="mr-2" /> Summary Icons
                        </h4>
                        <div className="grid grid-cols-1 gap-3">
                            <div className="flex items-center space-x-3 text-sm font-bold">
                                <div className="w-4 h-4 bg-green-500 rounded-full" />
                                <span>Answered</span>
                            </div>
                            <div className="flex items-center space-x-3 text-sm font-bold">
                                <div className="w-4 h-4 bg-orange-500 rounded-full" />
                                <span>Flagged</span>
                            </div>
                            <div className="flex items-center space-x-3 text-sm font-bold">
                                <div className="w-4 h-4 bg-slate-700 rounded-full" />
                                <span>Not Visited</span>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}
