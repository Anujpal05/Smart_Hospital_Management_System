import { AlertCircle, BrainCircuit,Heart, ChevronRight, FileText, Send, Sparkles, User, Zap, Thermometer } from 'lucide-react';
import React, { Activity, useState } from 'react'
import { patientData } from '../../Data/patientdata';
const healthMetrics = [
    { label: "Heart Rate", value: "72", unit: "bpm", trend: "+2", color: "text-rose-500", bg: "bg-rose-50", icon: Heart },
    { label: "Blood Pressure", value: "120/80", unit: "mmHg", trend: "Normal", color: "text-blue-500", bg: "bg-blue-50", icon: Activity },
    { label: "Temperature", value: "36.6", unit: "°C", trend: "Stable", color: "text-amber-500", bg: "bg-amber-50", icon: Thermometer },
    { label: "Blood Oxygen", value: "98", unit: "%", trend: "Optimal", color: "text-teal-500", bg: "bg-teal-50", icon: Zap },
  ];

  const recentAssessments = [
    { id: 1, date: "Oct 24, 2023", symptom: "Lower Back Pain", result: "Musculoskeletal Strain", severity: "Mild", urgency: "GP Follow-up" },
    { id: 2, date: "Sep 12, 2023", symptom: "Persistent Cough", result: "Seasonal Allergies", severity: "Low", urgency: "OTC Medication" },
    { id: 3, date: "Aug 05, 2023", symptom: "Occasional Vertigo", result: "Inner Ear Imbalance", severity: "Moderate", urgency: "Specialist Visit" },
  ];

  const medications = [
    { name: "Lisinopril", dosage: "10mg", time: "08:00 AM", status: "Taken" },
    { name: "Cetirizine", dosage: "5mg", time: "09:30 PM", status: "Upcoming" },
  ];
const AiAssistnate = () => {
  const [activeTab, setActiveTab] = useState('ai_assistant');
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [aiTyping, setAiTyping] = useState(false);
  return (
	<div className="space-y-8 min-h-screen animate-in slide-in-from-bottom-6 duration-500">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
                  <BrainCircuit className="text-purple-600" size={32} />
                  AI Smart Diagnosis Assistant
                </h2>
                <p className="text-slate-500 mt-1">Cross-referencing your medical history with latest clinical guidelines</p>
              </div>
              <div className="bg-amber-50 border border-amber-200 p-3 rounded-2xl flex items-start gap-3 max-w-sm">
                <AlertCircle className="text-amber-600 shrink-0 mt-0.5" size={18} />
                <p className="text-[10px] text-amber-800 leading-relaxed font-medium uppercase">
                  Disclaimer: This is an AI analysis, not a medical diagnosis. Always consult with your doctor before starting treatment.
                </p>
              </div>
            </div>
             <div className="lg:col-span-2 space-y-8">
                  <div className="bg-gradient-to-br from-blue-700 to-blue-900 rounded-2xl p-8 text-white relative overflow-hidden shadow-xl">
                    <div className="relative z-10 flex flex-col md:flex-row justify-between gap-6">
                      <div className="max-w-md">
                        <div className="flex items-center gap-2 mb-4">
                          <Zap className="text-amber-400 fill-amber-400" size={20} />
                          <span className="text-blue-200 text-xs font-black uppercase tracking-widest">Personalized AI Insights</span>
                        </div>
                        <h3 className="text-2xl font-bold mb-3 leading-tight">Your Sleep-Heart Consistency</h3>
                        <p className="text-blue-100/80 text-sm leading-relaxed mb-6">
                          We've noticed your resting heart rate decreases significantly when you sleep before 10:30 PM. Maintaining this schedule could improve your cardiovascular recovery score by 15%.
                        </p>
                        <button 
                          onClick={() => console.log("hii")}
                          className="bg-white text-blue-900 px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-blue-50 transition-colors"
                        >
                          View Full Analysis
                        </button>
                      </div>
                      <div className="flex items-center justify-center">
                        <div className="w-32 h-32 rounded-full border-4 border-white/20 flex items-center justify-center relative">
                          <div className="absolute inset-0 border-t-4 border-white rounded-full animate-spin duration-[3000ms]"></div>
                          <span className="text-3xl font-black">85%</span>
                        </div>
                      </div>
                    </div>
                    {/* Decorative background shapes */}
                    <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl"></div>
                    <div className="absolute -top-10 -left-10 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl"></div>
                  </div>

                  {/* Recent Assessments Table */}
                  <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                      <h3 className="font-bold text-lg">Diagnostic History</h3>
                      <button className="text-blue-600 text-sm font-bold hover:underline">View All</button>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-slate-50 text-left">
                            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Condition / Symptom</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Severity</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Action</th>
                            <th className="px-6 py-4"></th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {recentAssessments.map((item) => (
                            <tr key={item.id} className="hover:bg-slate-50 transition-colors group">
                              <td className="px-6 py-4">
                                <div>
                                  <p className="font-bold text-slate-800">{item.result}</p>
                                  <p className="text-xs text-slate-400">Report: {item.symptom}</p>
                                </div>
                              </td>
                              <td className="px-6 py-4 text-sm text-slate-500">{item.date}</td>
                              <td className="px-6 py-4">
                                <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-md ${
                                  item.severity === 'Low' ? 'bg-green-100 text-green-700' : 
                                  item.severity === 'Moderate' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                                }`}>
                                  {item.severity}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-sm font-medium text-blue-600">{item.urgency}</td>
                              <td className="px-6 py-4 text-right">
                                <button className="text-slate-300 group-hover:text-blue-600 transition-colors">
                                  <ChevronRight size={20} />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Analysis Sidebar */}
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                  <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest mb-4">Latest Scan Analysis</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <p className="text-xs font-bold text-slate-400 mb-1 uppercase">Source Document</p>
                      <p className="text-sm font-bold text-slate-800">Blood Chemistry Profile (Oct 12)</p>
                    </div>
                    <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                      <div className="flex items-center gap-2 mb-1">
                        <Zap size={14} className="text-emerald-600" />
                        <p className="text-xs font-bold text-emerald-600 uppercase">Status: Healthy</p>
                      </div>
                      <p className="text-sm text-slate-700 leading-relaxed">Glucose, Lipid Profile, and Kidney Function markers are all within optimal ranges.</p>
                    </div>
                    <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100">
                      <div className="flex items-center gap-2 mb-1">
                        <Activity size={14} className="text-amber-600" />
                        <p className="text-xs font-bold text-amber-600 uppercase">Attention Needed</p>
                      </div>
                      <p className="text-sm text-slate-700 leading-relaxed">Vitamin D (25-OH) is at 22 ng/mL (Target: 30+). Recommended supplementation.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-indigo-50 p-6 rounded-3xl border border-indigo-100">
                  <h3 className="text-sm font-bold text-indigo-900 mb-4">AI Recommendations</h3>
                  <ul className="space-y-3">
                    {patientData.aiInsights.suggestions.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-indigo-800">
                        <div className="h-5 w-5 rounded-full bg-indigo-200 flex items-center justify-center shrink-0 font-bold text-[10px]">
                          {idx + 1}
                        </div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Interaction Hub */}
              <div className="lg:col-span-2 flex flex-col h-[600px] bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden">
                <div className="p-6 bg-slate-50/50 border-b border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-purple-600 p-2 rounded-xl text-white">
                      <Sparkles size={18} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800">Ask your Data Assistant</h4>
                      <p className="text-xs text-slate-500">I can read your reports and answer medical queries</p>
                    </div>
                  </div>
                </div>

                <div className="flex-1 p-6 overflow-y-auto space-y-6 bg-slate-50/20">
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center text-white shrink-0">
                      <BrainCircuit size={16} />
                    </div>
                    <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-slate-100 shadow-sm max-w-[85%]">
                      <p className="text-sm text-slate-700 leading-relaxed">
                        Hello Alex! I have analyzed your 3 latest reports and your vitals history. How can I help you understand your health better today?
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 flex-row-reverse">
                    <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shrink-0">
                      <User size={16} />
                    </div>
                    <div className="bg-blue-600 p-4 rounded-2xl rounded-tr-none shadow-sm max-w-[85%]">
                      <p className="text-sm text-white leading-relaxed">
                        Is my low Vitamin D why I've been feeling tired lately?
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center text-white shrink-0">
                      <BrainCircuit size={16} />
                    </div>
                    <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-slate-100 shadow-sm max-w-[85%]">
                      <p className="text-sm text-slate-700 leading-relaxed">
                        It's very likely. Vitamin D deficiency is frequently associated with fatigue and muscle weakness. Your level of 22 ng/mL is considered a "deficiency." I suggest asking Dr. Jenkins for a specific dosage of Vitamin D3 supplements during your next visit on Oct 24.
                      </p>
                    </div>
                  </div>

                  {aiTyping && (
                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center text-white shrink-0 animate-pulse">
                        <Sparkles size={16} />
                      </div>
                      <div className="bg-slate-100 p-3 rounded-xl animate-pulse flex gap-1">
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-75"></div>
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-150"></div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-6 bg-white border-t border-slate-100">
                  <div className="flex gap-3 items-center">
                    <div className="flex-1 relative">
                      <input 
                        type="text" 
                        placeholder="Ask about your health reports..."
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-2">
                        <button className="p-2 text-slate-400 hover:text-purple-600 transition-colors">
                          <FileText size={18} />
                        </button>
                      </div>
                    </div>
                    <button 
                      onClick={() => {
                        setAiTyping(true);
                        setTimeout(() => setAiTyping(false), 2000);
                      }}
                      className="bg-purple-600 text-white p-4 rounded-2xl shadow-lg shadow-purple-200 hover:bg-purple-700 transition-all active:scale-95"
                    >
                      <Send size={20} />
                    </button>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {["Interpret Labs", "Compare Vitals", "Suggest Exercise"].map(tag => (
                      <button key={tag} className="text-[10px] font-bold text-slate-400 border border-slate-200 px-3 py-1.5 rounded-lg hover:bg-slate-50 transition-colors">
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
  )
}

export default AiAssistnate