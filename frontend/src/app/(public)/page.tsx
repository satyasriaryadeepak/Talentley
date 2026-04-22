"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Award, BookOpen, BarChart3, Users, ArrowRight, CheckCircle2, Star, Sparkles, Megaphone, Trophy, Timer, HelpCircle, Medal } from 'lucide-react';

export default function Home() {
  const [stats, setStats] = useState({ students: '50k+', exams: '120+', awards: '15+' });
  const [content, setContent] = useState<any>(null);
  const [exams, setExams] = useState<any[]>([
    { grade: 'Class 1-2', title: 'Talent Hunt Junior', desc: 'Focuses on foundational logic, pattern recognition, and basic creativity.', image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800' },
    { grade: 'Class 3-5', title: 'Primary Discovery', desc: 'Intermediate analytical skills, math challenges, and environmental science.', image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=800' },
    { grade: 'Class 6-8', title: 'Scholar\'s Challenge', desc: 'Advanced problem solving, critical thinking, and linguistic proficiency.', image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=800' },
    { grade: 'Class 9-10', title: 'Excellence Pinnacle', desc: 'Competitive exam preparation including Physics, Chemistry, and higher Maths.', image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=800' }
  ]);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);

  useEffect(() => {
    // Fetch Stats
    fetch('http://localhost:5000/api/stats/landing')
      .then(res => res.json())
      .then(data => setStats({
        students: `${data.students}+`,
        exams: `${data.exams}+`,
        awards: `${data.awards}+`
      }))
      .catch(console.error);

    // Fetch Landing Page Content (Settings)
    fetch('http://localhost:5000/api/settings')
      .then(res => res.json())
      .then(data => setContent(data))
      .catch(console.error);

    // Fetch Published Exams
    fetch('http://localhost:5000/api/exams/published')
      .then(res => res.json())
      .then(data => {
          if (data && data.length > 0) {
              const images = [
                'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800',
                'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=800',
                'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=800',
                'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=800'
              ];
              const dynamicExams = data.slice(0, 4).map((ex: any, idx: number) => ({
                  grade: ex.Class ? ex.Class.name : 'All Classes',
                  title: ex.title,
                  desc: ex.description || 'Join this exam to test your knowledge.',
                  image: images[idx % images.length]
              }));
              setExams(dynamicExams);
          }
      })
      .catch(console.error);

    // Fetch Leaderboard
    fetch('http://localhost:5000/api/winners')
      .then(res => res.json())
      .then(winnersData => {
          if (winnersData && winnersData.length >= 3) {
              // Map curated winners to match existing JSX structure
              const mapped = winnersData.map((w: any) => ({
                  percentage: w.score,
                  Submission: {
                      Student: { name: w.studentName, profileImage: w.image || `https://i.pravatar.cc/150?u=${w.id}` },
                      Exam: { title: w.className + " (" + w.examName + ")" }
                  }
              }));
              setLeaderboard(mapped);
          } else {
              // Fallback to automatic results
              fetch('http://localhost:5000/api/leaderboard')
                .then(res => res.json())
                .then(data => {
                    if (data && data.length > 0) {
                        setLeaderboard(data);
                    } else {
                        // Mock data if empty
                        setLeaderboard([
                            { percentage: 99.8, Submission: { Student: { name: 'Priya Patel', profileImage: 'https://i.pravatar.cc/150?u=1' }, Exam: { title: 'Class 10' } } },
                            { percentage: 98.5, Submission: { Student: { name: 'Aarav Sharma', profileImage: 'https://i.pravatar.cc/150?u=2' }, Exam: { title: 'Class 8' } } },
                            { percentage: 97.2, Submission: { Student: { name: 'Ishaan Verma', profileImage: 'https://i.pravatar.cc/150?u=3' }, Exam: { title: 'Class 9' } } },
                            { percentage: 96.5, Submission: { Student: { name: 'Ananya Roy', profileImage: 'https://i.pravatar.cc/150?u=4' }, Exam: { title: 'Class 7' } } },
                            { percentage: 95.9, Submission: { Student: { name: 'Kabir Singh', profileImage: 'https://i.pravatar.cc/150?u=5' }, Exam: { title: 'Class 6' } } },
                            { percentage: 95.4, Submission: { Student: { name: 'Meera Nair', profileImage: 'https://i.pravatar.cc/150?u=8' }, Exam: { title: 'Class 8' } } },
                        ]);
                    }
                })
                .catch(console.error);
          }
      })
      .catch(console.error);
  }, []);
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="flex flex-col bg-[#fbfdff] selection:bg-primary/10">
      {/* Background Blobs */}
      <div className="blob top-[-100px] left-[-100px] animate-pulse-slow"></div>
      <div className="blob bottom-[10%] right-[-100px] bg-secondary/10 animate-pulse-slow" style={{ animationDelay: '2s' }}></div>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-32">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-start">
          <motion.div 
            initial="initial"
            animate="animate"
            variants={stagger}
            className="flex flex-col gap-8 z-10"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold w-fit">
              <Star className="w-4 h-4" />
              National Level Talent Exams
            </motion.div>
            
            <motion.h1 variants={fadeInUp} className="text-5xl lg:text-7xl font-black leading-[1.1] text-slate-900 tracking-tight">
              {content?.hero_title ? (
                <>
                  {content.hero_title.split('Talentley').map((part: string, i: number, arr: any) => 
                    <span key={i}>{part}{i < arr.length - 1 && <span className="text-primary">Talentley</span>}</span>
                  )}
                </>
              ) : (
                <>Discover Your <span className="text-primary">Talent</span> with Talentley</>
              )}
            </motion.h1>
            
            <motion.p variants={fadeInUp} className="text-lg text-slate-600 leading-relaxed max-w-xl">
              {content?.hero_subtitle || 'A dedicated platform for students from Class 1 to Class 10 to participate in competitive talent exams, showcase abilities, and win prestigious rewards.'}
            </motion.p>
            
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
              <Link href="/exams" className="px-8 py-4 bg-primary text-white font-bold rounded-xl text-lg shadow-xl shadow-primary/30 hover:translate-y-[-2px] transition-all">
                Explore Exams
              </Link>
              <Link href="/syllabus" className="px-8 py-4 bg-slate-100 text-slate-900 font-bold rounded-xl text-lg border border-slate-200 hover:bg-slate-200 transition-all">
                View Syllabus
              </Link>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative max-w-lg mx-auto lg:ml-auto"
          >
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
            <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl border-8 border-white group">
              <img 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop"
                alt="Student Excellence"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* About & Announcement Banner */}
      <section className="py-16 bg-white" id="about">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-primary rounded-3xl p-8 lg:p-12 mb-20 flex flex-col lg:flex-row items-center justify-between gap-8 text-white relative overflow-hidden shadow-2xl"
          >
            <div className="relative z-10 lg:max-w-2xl">
              <h3 className="text-3xl font-bold mb-4">{content?.announcement_title || 'Summer Talent Fest 2024'}</h3>
              <p className="text-white/90 text-lg">{content?.announcement_desc || 'Participate in the National Scholarship Exam. Login to get started!'}</p>
            </div>
            <div className="relative z-10 flex gap-4">
              <Link href="/login/student" className="px-8 py-4 bg-white/20 hover:bg-white/30 text-white font-bold rounded-xl whitespace-nowrap transition-colors border border-white/50 backdrop-blur-sm">
                Login
              </Link>
              <Link href="/register" className="px-8 py-4 bg-white text-primary font-bold rounded-xl whitespace-nowrap hover:bg-slate-100 transition-colors shadow-lg">
                Register Now
              </Link>
            </div>
            <div className="absolute right-0 top-0 opacity-10 translate-x-1/4 -translate-y-1/4">
              <Megaphone className="w-[300px] h-[300px]" />
            </div>
          </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-black mb-6">{content?.why_choose_title || 'Why Choose Talentley School?'}</h2>
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
              {content?.why_choose_desc1 || 'Talentley School is an online examination platform designed to identify and encourage the talents of students. Through structured exams and competitions, students can demonstrate their knowledge and skills.'}
            </p>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              {content?.why_choose_desc2 || 'Top-performing students are recognized and rewarded to motivate excellence. Our methodology focuses on analytical thinking rather than rote learning.'}
            </p>
            <div className="flex gap-8">
              {[
                { label: 'Students', value: stats.students },
                { label: 'Exams', value: stats.exams },
                { label: 'Awards', value: stats.awards },
              ].map((stat, i) => (
                <div key={i} className="flex items-center gap-8">
                  <div>
                    <div className="text-4xl font-black text-primary">{stat.value}</div>
                    <div className="text-sm font-semibold uppercase tracking-wider text-slate-500">{stat.label}</div>
                  </div>
                  {i < 2 && <div className="w-px h-12 bg-slate-200"></div>}
                </div>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: <HelpCircle className="text-primary w-10 h-10" />, title: 'Online Talent Exams', desc: 'Secure testing environment accessible from anywhere.', variant: 'bg-slate-50 border-slate-100', margin: '' },
              { icon: <Users className="text-primary w-10 h-10" />, title: 'Class-wise Contests', desc: 'Age-appropriate challenges for every grade.', variant: 'bg-primary/5 border-primary/10', margin: 'mt-8' },
              { icon: <Timer className="text-primary w-10 h-10" />, title: 'Instant Results', desc: 'Get your scorecard immediately after completion.', variant: 'bg-primary/5 border-primary/10', margin: '' },
              { icon: <Trophy className="text-primary w-10 h-10" />, title: 'Recognition', desc: 'Awards and certificates for top performers.', variant: 'bg-slate-50 border-slate-100', margin: 'mt-8' },
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`p-8 rounded-2xl border ${feature.variant} ${feature.margin} shadow-sm hover:shadow-md transition-shadow`}
              >
                <div className="mb-4">{feature.icon}</div>
                <h4 className="font-bold mb-2 text-slate-900">{feature.title}</h4>
                <p className="text-sm text-slate-500">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* Exams Section */}
    <section className="py-24" id="exams">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <h2 className="text-4xl font-black mb-4 tracking-tight">Available Talent Exams</h2>
              <p className="text-slate-500 text-lg">Select your class level and start your journey towards academic excellence. Each exam is designed by subject matter experts.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {exams.map((exam, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-2xl transition-all flex flex-col"
              >
                <div className="h-48 relative overflow-hidden">
                  <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src={exam.image} alt={exam.title} />
                  <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase">{exam.grade}</div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-bold mb-2 text-slate-900">{exam.title}</h3>
                  <p className="text-slate-500 text-sm mb-6 flex-1 italic">{exam.desc}</p>
                  <Link href="/login/student" className="w-full">
                    <button className="w-full py-3 bg-slate-50 group-hover:bg-primary group-hover:text-white text-slate-900 font-bold rounded-xl transition-colors flex items-center justify-center gap-2">
                      Login / Register <ArrowRight className="w-4 h-4" />
                    </button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leaderboard Section */}
      <section className="py-24 bg-slate-50" id="leaderboard">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl font-black mb-4 tracking-tight">The Hall of Fame</h2>
            <p className="text-slate-500 text-lg">Celebrating our top achievers from the last national level competition. Performance based rankings are updated weekly.</p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8 mb-16 items-end">
            {/* Rank 2 */}
            {leaderboard[1] && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-3xl border border-slate-100 flex flex-col items-center text-center shadow-lg lg:order-1"
            >
              <div className="relative mb-6">
                <div className="w-24 h-24 rounded-full border-4 border-slate-300 overflow-hidden">
                  <img className="w-full h-full object-cover" src={leaderboard[1].Submission?.Student?.profileImage || "https://i.pravatar.cc/150?u=2"} alt="Student" />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-slate-300 text-slate-800 text-xs font-bold w-8 h-8 rounded-full flex items-center justify-center">2nd</div>
              </div>
              <h4 className="text-xl font-bold mb-1 text-slate-900">{leaderboard[1].Submission?.Student?.name}</h4>
              <p className="text-primary text-sm font-bold mb-4">{leaderboard[1].Submission?.Exam?.title}</p>
              <div className="text-3xl font-black text-slate-800">{leaderboard[1].percentage}</div>
              <p className="text-xs uppercase tracking-widest text-slate-400 font-bold">Total Score</p>
            </motion.div>
            )}

            {/* Rank 1 */}
            {leaderboard[0] && (
            <motion.div 
              initial={{ opacity: 0, scale: 1.1 }}
              whileInView={{ opacity: 1, scale: 1.05 }}
              viewport={{ once: true }}
              className="bg-white p-10 rounded-3xl border-2 border-primary flex flex-col items-center text-center shadow-2xl relative overflow-hidden z-10 lg:order-2"
            >
              <div className="absolute top-0 right-0 p-4 bg-primary text-white font-bold rounded-bl-2xl">
                <Medal className="w-6 h-6" />
              </div>
              <div className="relative mb-6">
                <div className="w-32 h-32 rounded-full border-4 border-yellow-500 overflow-hidden">
                  <img className="w-full h-full object-cover" src={leaderboard[0].Submission?.Student?.profileImage || "https://i.pravatar.cc/150?u=1"} alt="Top Student" />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-yellow-500 text-white text-xs font-bold w-10 h-10 rounded-full flex items-center justify-center">1st</div>
              </div>
              <h4 className="text-2xl font-bold mb-1 text-slate-900">{leaderboard[0].Submission?.Student?.name}</h4>
              <p className="text-primary text-sm font-bold mb-4">{leaderboard[0].Submission?.Exam?.title}</p>
              <div className="text-4xl font-black text-slate-800">{leaderboard[0].percentage}</div>
              <p className="text-xs uppercase tracking-widest text-slate-400 font-bold">Total Score</p>
            </motion.div>
            )}

            {/* Rank 3 */}
            {leaderboard[2] && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-3xl border border-slate-100 flex flex-col items-center text-center shadow-lg lg:order-3"
            >
              <div className="relative mb-6">
                <div className="w-24 h-24 rounded-full border-4 border-amber-600 overflow-hidden">
                  <img className="w-full h-full object-cover" src={leaderboard[2].Submission?.Student?.profileImage || "https://i.pravatar.cc/150?u=3"} alt="Student" />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-amber-600 text-white text-xs font-bold w-8 h-8 rounded-full flex items-center justify-center">3rd</div>
              </div>
              <h4 className="text-xl font-bold mb-1 text-slate-900">{leaderboard[2].Submission?.Student?.name}</h4>
              <p className="text-primary text-sm font-bold mb-4">{leaderboard[2].Submission?.Exam?.title}</p>
              <div className="text-3xl font-black text-slate-800">{leaderboard[2].percentage}</div>
              <p className="text-xs uppercase tracking-widest text-slate-400 font-bold">Total Score</p>
            </motion.div>
            )}
          </div>

          <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  <th className="px-8 py-5 text-sm font-bold uppercase tracking-wider text-slate-500">Rank</th>
                  <th className="px-8 py-5 text-sm font-bold uppercase tracking-wider text-slate-500">Student Name</th>
                  <th className="px-8 py-5 text-sm font-bold uppercase tracking-wider text-slate-500">Class</th>
                  <th className="px-8 py-5 text-sm font-bold uppercase tracking-wider text-slate-500 text-right">Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {leaderboard.slice(3).map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="px-8 py-4 font-bold text-slate-700">#{i + 4}</td>
                    <td className="px-8 py-4 flex items-center gap-3">
                      <img className="w-8 h-8 rounded-full" src={row.Submission?.Student?.profileImage || `https://i.pravatar.cc/150?u=${i+4}`} alt={row.Submission?.Student?.name} />
                      <span className="font-semibold text-slate-900">{row.Submission?.Student?.name}</span>
                    </td>
                    <td className="px-8 py-4 text-slate-600">{row.Submission?.Exam?.title}</td>
                    <td className="px-8 py-4 text-right font-bold text-primary">{row.percentage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 overflow-hidden relative">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="premium-gradient rounded-[4rem] p-12 lg:p-20 text-center relative overflow-hidden shadow-3xl"
          >
             <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
             <div className="relative z-10 max-w-3xl mx-auto">
               <h2 className="text-4xl lg:text-6xl font-black text-white mb-8 tracking-tight">Ready to Discover Your Talent?</h2>
               <p className="text-xl text-white/80 mb-12">Join thousands of students and start your journey today. Login with your student ID to begin.</p>
               <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                 <Link href="/login/student" className="bg-white/10 text-white border-2 border-white/30 px-12 py-5 rounded-2xl font-black text-xl hover:bg-white/20 transition-all backdrop-blur-sm">
                   Login
                 </Link>
                 <Link href="/register" className="bg-white text-primary px-12 py-5 rounded-2xl font-black text-xl hover:shadow-2xl transition-all hover:scale-105 shadow-xl">
                   Register Now
                 </Link>
                 <Link href="/contact" className="text-white border-2 border-white/30 px-12 py-5 rounded-2xl font-black text-xl hover:bg-white/10 transition-all">
                   Contact Us
                 </Link>
               </div>
             </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

