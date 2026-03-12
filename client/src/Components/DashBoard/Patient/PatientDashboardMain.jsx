
import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Calendar, 
  FileText, 
  Pill, 
  MessageSquare, 
  CreditCard, 
  Settings, 
  Bell, 
  Search, 
  User, 
  Activity, 
  Clock, 
  ChevronRight, 
  Video, 
  Download, 
  Plus,
  Menu,
  X,
  Droplet,
  HeartPulse,
  Thermometer,
  Sparkles
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';


  // Mock data for the patient
  const patientData = {
    name: "Alex Thompson",
    id: "PT-88293",
    age: 32,
    bloodType: "O+",
    vitals: {
      heartRate: "72 bpm",
      bloodPressure: "120/80",
      temp: "98.6°F",
      weight: "74 kg"
    },
    upcomingAppointments: [
      { id: 1, doctor: "Dr. Sarah Jenkins", specialty: "Cardiology", date: "Oct 24, 2023", time: "10:30 AM", status: "Confirmed" },
      { id: 2, doctor: "Dr. Michael Chen", specialty: "Dermatology", date: "Nov 02, 2023", time: "02:15 PM", status: "Pending" }
    ],
    recentRecords: [
      { id: 1, type: "Lab Result", title: "Blood Chemistry Profile", date: "Oct 12, 2023", doctor: "Dr. Sarah Jenkins" },
      { id: 2, type: "Prescription", title: "Amoxicillin 500mg", date: "Oct 10, 2023", doctor: "Dr. Robert Wilson" },
      { id: 3, type: "Imaging", title: "Chest X-Ray", date: "Sep 28, 2023", doctor: "Dr. Lisa Ray" }
    ],
    aiInsights: {
      analysis: "Based on your 'Blood Chemistry Profile' from Oct 12, your glucose levels are within the optimal range. However, your Vitamin D levels are slightly lower than the recommended 30 ng/mL.",
      suggestions: [
        "Increase sun exposure (15 mins daily)",
        "Incorporate Vitamin D-rich foods like salmon or egg yolks",
        "Maintain current cardiovascular exercise routine"
      ],
      warning: "Your Blood Pressure (120/80) is perfect. No immediate action required."
    }
  };


export default function PatientDashboardMain() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
   const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [aiTyping, setAiTyping] = useState(false);

  const navigation = [
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
    { id: 'appointments', name: 'Appointments', icon: Calendar },
    { id: 'records', name: 'Medical Records', icon: FileText },
    { id: 'medications', name: 'Medications', icon: Pill },
    { id: 'messages', name: 'Messages', icon: MessageSquare, badge: 2 },
    { id: 'billing', name: 'Billing & Payments', icon: CreditCard },
    { id: 'settings', name: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen flex font-sans text-slate-800">
       <div className="max-w-6xl mx-auto space-y-6">
      {/* Welcome Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Good morning, John!</h1>
          <p className="text-slate-500">Here is your health summary for today.</p>
        </div>
        
        <div className="bg-white px-4 py-2 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
          <div className="bg-green-100 p-2 rounded-full">
            <Activity className="h-4 w-4 text-green-600" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Health Status</p>
            <p className="text-sm font-bold text-slate-900">Stable & Healthy</p>
          </div>
        </div>
      </div>
       {/* AI Summary Highlight */}
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 rounded-3xl p-6 text-white shadow-xl flex flex-col md:flex-row items-center justify-between relative overflow-hidden">
               <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
                 <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-md">
                   <Sparkles className="text-amber-300" size={32} />
                 </div>
                 <div className="text-center md:text-left">
                   <h2 className="text-xl font-bold flex items-center justify-center md:justify-start">
                     AI Health Insight
                     <span className="ml-2 text-[10px] bg-white/20 px-2 py-1 rounded-full border border-white/30 uppercase tracking-widest">Live Analysis</span>
                   </h2>
                   <p className="text-blue-100 text-sm mt-1 max-w-xl">
                     {patientData.aiInsights.analysis}
                   </p>
                 </div>
               </div>
               <button 
                onClick={() => navigate('/patient/ai-assistant')}
                className=" cursor-pointer mt-4 md:mt-0 relative z-10 bg-white text-indigo-600 px-6 py-3 rounded-2xl font-bold text-sm hover:shadow-lg transition-all flex items-center gap-2 whitespace-nowrap"
               >
                 View Full Report <ChevronRight size={16} />
               </button>
               {/* Abstract Background Shapes */}
               <div className="absolute top-[-50%] left-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
               <div className="absolute bottom-[-50%] right-[-10%] w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"></div>
            </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (Appointments & Medications) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Upcoming Appointment Card */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-600" />
                Upcoming Appointment
              </h2>
              <button className="text-sm text-blue-600 font-medium hover:text-blue-800">View All</button>
            </div>
            <div className="p-6 sm:flex items-center justify-between gap-6">
              <div className="flex items-start gap-4 mb-4 sm:mb-0">
                <img 
                  src="https://ui-avatars.com/api/?name=Dr+Sarah+Jenkins&background=eff6ff&color=1d4ed8" 
                  alt="Dr. Sarah Jenkins" 
                  className="h-12 w-12 rounded-full border border-slate-200"
                />
                <div>
                  <h3 className="font-bold text-slate-900">Dr. Sarah Jenkins</h3>
                  <p className="text-sm text-slate-500">Cardiology Specialist</p>
                  <div className="flex items-center gap-4 mt-2 text-sm font-medium text-slate-700">
                    <span className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded-md">
                      <Calendar className="h-4 w-4 text-slate-500" /> Mar 15, 2026
                    </span>
                    <span className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded-md">
                      <Clock className="h-4 w-4 text-slate-500" /> 10:00 AM
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:items-end gap-2">
                <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-700 w-fit">
                  <Video className="h-3 w-3" /> Telehealth
                </span>
                <button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-2xl font-medium transition-colors text-sm shadow-sm">
                  Join Video Call
                </button>
                <button className="text-xs text-slate-500 hover:text-slate-700 underline font-medium mt-1">
                  Reschedule
                </button>
              </div>
            </div>
          </div>

          {/* Health Vitals Grid */}
          <div>
            <h2 className="text-lg font-bold text-slate-900 mb-4">Latest Vitals</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <VitalCard icon={HeartPulse} label="Heart Rate" value="72" unit="bpm" status="normal" color="text-rose-500" bg="bg-rose-50" />
              <VitalCard icon={Activity} label="Blood Pressure" value="120/80" unit="mmHg" status="normal" color="text-blue-500" bg="bg-blue-50" />
              <VitalCard icon={Droplet} label="Glucose" value="95" unit="mg/dL" status="normal" color="text-purple-500" bg="bg-purple-50" />
              <VitalCard icon={Thermometer} label="Temperature" value="98.6" unit="°F" status="normal" color="text-orange-500" bg="bg-orange-50" />
            </div>
          </div>

          {/* Active Medications */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Pill className="h-5 w-5 text-blue-600" />
                Active Medications
              </h2>
            </div>
            <div className="divide-y divide-slate-100">
              <MedicationItem 
                name="Lisinopril" 
                dosage="10mg" 
                instructions="1 pill daily with food"
                remaining={12}
                total={30}
              />
              <MedicationItem 
                name="Atorvastatin" 
                dosage="20mg" 
                instructions="1 pill at bedtime"
                remaining={5}
                total={30}
                needsRefill
              />
            </div>
          </div>
        </div>

        {/* Right Column (Lab Results & Quick Actions) */}
        <div className="space-y-6">
          
          {/* Quick Actions */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3">
              <QuickAction icon={Calendar} label="Book Visit" />
              <QuickAction icon={MessageSquare} label="Message" />
              <QuickAction icon={Pill} label="Refill Rx" />
              <QuickAction icon={CreditCard} label="Pay Bill" alert />
            </div>
          </div>

          {/* Recent Lab Results */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
            <div className="px-5 py-4 border-b border-slate-200">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                Recent Test Results
              </h2>
            </div>
            <div className="p-2">
              <LabResultItem title="Complete Blood Count (CBC)" date="Mar 10, 2026" status="Normal" />
              <LabResultItem title="Lipid Panel" date="Mar 10, 2026" status="Review Required" />
              <LabResultItem title="Metabolic Panel" date="Feb 15, 2026" status="Normal" />
            </div>
            <div className="p-3 border-t border-slate-100 text-center">
              <button className="text-sm text-blue-600 font-medium hover:text-blue-800 flex items-center justify-center gap-1 w-full">
                View All Records <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
    </div>
  );
}

// Sub-components for the Dashboard View

function DashboardHome() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Welcome Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Good morning, John!</h1>
          <p className="text-slate-500">Here is your health summary for today.</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
          <div className="bg-green-100 p-2 rounded-full">
            <Activity className="h-4 w-4 text-green-600" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Health Status</p>
            <p className="text-sm font-bold text-slate-900">Stable & Healthy</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (Appointments & Medications) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Upcoming Appointment Card */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-600" />
                Upcoming Appointment
              </h2>
              <button className="text-sm text-blue-600 font-medium hover:text-blue-800">View All</button>
            </div>
            <div className="p-6 sm:flex items-center justify-between gap-6">
              <div className="flex items-start gap-4 mb-4 sm:mb-0">
                <img 
                  src="https://ui-avatars.com/api/?name=Dr+Sarah+Jenkins&background=eff6ff&color=1d4ed8" 
                  alt="Dr. Sarah Jenkins" 
                  className="h-12 w-12 rounded-full border border-slate-200"
                />
                <div>
                  <h3 className="font-bold text-slate-900">Dr. Sarah Jenkins</h3>
                  <p className="text-sm text-slate-500">Cardiology Specialist</p>
                  <div className="flex items-center gap-4 mt-2 text-sm font-medium text-slate-700">
                    <span className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded-md">
                      <Calendar className="h-4 w-4 text-slate-500" /> Mar 15, 2026
                    </span>
                    <span className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded-md">
                      <Clock className="h-4 w-4 text-slate-500" /> 10:00 AM
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:items-end gap-2">
                <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-700 w-fit">
                  <Video className="h-3 w-3" /> Telehealth
                </span>
                <button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-2xl font-medium transition-colors text-sm shadow-sm">
                  Join Video Call
                </button>
                <button className="text-xs text-slate-500 hover:text-slate-700 underline font-medium mt-1">
                  Reschedule
                </button>
              </div>
            </div>
          </div>

          {/* Health Vitals Grid */}
          <div>
            <h2 className="text-lg font-bold text-slate-900 mb-4">Latest Vitals</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <VitalCard icon={HeartPulse} label="Heart Rate" value="72" unit="bpm" status="normal" color="text-rose-500" bg="bg-rose-50" />
              <VitalCard icon={Activity} label="Blood Pressure" value="120/80" unit="mmHg" status="normal" color="text-blue-500" bg="bg-blue-50" />
              <VitalCard icon={Droplet} label="Glucose" value="95" unit="mg/dL" status="normal" color="text-purple-500" bg="bg-purple-50" />
              <VitalCard icon={Thermometer} label="Temperature" value="98.6" unit="°F" status="normal" color="text-orange-500" bg="bg-orange-50" />
            </div>
          </div>

          {/* Active Medications */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Pill className="h-5 w-5 text-blue-600" />
                Active Medications
              </h2>
            </div>
            <div className="divide-y divide-slate-100">
              <MedicationItem 
                name="Lisinopril" 
                dosage="10mg" 
                instructions="1 pill daily with food"
                remaining={12}
                total={30}
              />
              <MedicationItem 
                name="Atorvastatin" 
                dosage="20mg" 
                instructions="1 pill at bedtime"
                remaining={5}
                total={30}
                needsRefill
              />
            </div>
          </div>
        </div>

        {/* Right Column (Lab Results & Quick Actions) */}
        <div className="space-y-6">
          
          {/* Quick Actions */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3">
              <QuickAction icon={Calendar} label="Book Visit" />
              <QuickAction icon={MessageSquare} label="Message" />
              <QuickAction icon={Pill} label="Refill Rx" />
              <QuickAction icon={CreditCard} label="Pay Bill" alert />
            </div>
          </div>

          {/* Recent Lab Results */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
            <div className="px-5 py-4 border-b border-slate-200">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                Recent Test Results
              </h2>
            </div>
            <div className="p-2">
              <LabResultItem title="Complete Blood Count (CBC)" date="Mar 10, 2026" status="Normal" />
              <LabResultItem title="Lipid Panel" date="Mar 10, 2026" status="Review Required" />
              <LabResultItem title="Metabolic Panel" date="Feb 15, 2026" status="Normal" />
            </div>
            <div className="p-3 border-t border-slate-100 text-center">
              <button className="text-sm text-blue-600 font-medium hover:text-blue-800 flex items-center justify-center gap-1 w-full">
                View All Records <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

function VitalCard({ icon: Icon, label, value, unit, status, color, bg }) {
  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
      <div className="flex items-center gap-2 mb-3">
        <div className={`p-2 rounded-2xl ${bg}`}>
          <Icon className={`h-4 w-4 ${color}`} />
        </div>
        <span className="text-xs font-semibold text-slate-500 tracking-wide uppercase">{label}</span>
      </div>
      <div>
        <span className="text-2xl font-bold text-slate-900">{value}</span>
        <span className="text-sm text-slate-500 ml-1">{unit}</span>
      </div>
    </div>
  );
}

function MedicationItem({ name, dosage, instructions, remaining, total, needsRefill }) {
  const percentage = (remaining / total) * 100;
  
  return (
    <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h3 className="font-bold text-slate-900">{name} <span className="text-slate-500 font-normal">{dosage}</span></h3>
        <p className="text-sm text-slate-500 mt-0.5">{instructions}</p>
      </div>
      <div className="flex items-center gap-6">
        <div className="w-32 hidden sm:block">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-slate-500 font-medium">{remaining} left</span>
            <span className={needsRefill ? 'text-red-500 font-bold' : 'text-slate-400'}>
              {needsRefill ? 'Refill Now' : 'Good'}
            </span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1.5">
            <div 
              className={`bg-${needsRefill ? 'red' : 'green'}-500 h-1.5 rounded-full`} 
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
        </div>
        <button className={`
          px-3 py-1.5 rounded-md text-sm font-medium border transition-colors
          ${needsRefill 
            ? 'border-red-200 text-red-600 bg-red-50 hover:bg-red-100' 
            : 'border-slate-200 text-slate-600 hover:bg-slate-50'
          }
        `}>
          Request Refill
        </button>
      </div>
    </div>
  );
}

function QuickAction({ icon: Icon, label, alert }) {
  return (
    <button className="flex flex-col items-center justify-center p-3 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-blue-50 hover:border-blue-100 transition-colors group relative">
      {alert && (
        <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500"></span>
      )}
      <Icon className="h-6 w-6 text-slate-400 group-hover:text-blue-600 mb-2 transition-colors" />
      <span className="text-xs font-semibold text-slate-700 group-hover:text-blue-700">{label}</span>
    </button>
  );
}

function LabResultItem({ title, date, status }) {
  const isNormal = status === 'Normal';
  return (
    <div className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-2xl transition-colors cursor-pointer group">
      <div>
        <h4 className="font-semibold text-sm text-slate-900 group-hover:text-blue-600 transition-colors">{title}</h4>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs text-slate-500">{date}</span>
          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider ${
            isNormal ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
          }`}>
            {status}
          </span>
        </div>
      </div>
      <button className="p-2 text-slate-400 hover:text-blue-600 rounded-full hover:bg-blue-50 transition-colors">
        <Download className="h-4 w-4" />
      </button>
    </div>
  );
}

// Simple placeholder for other tabs to show routing works
function PlaceholderTab({ name }) {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-slate-400 border-2 border-dashed border-slate-200 rounded-2xl bg-white">
      <Settings className="h-12 w-12 mb-4 animate-spin-slow opacity-20" />
      <h2 className="text-xl font-bold text-slate-600 capitalize">{name.replace('-', ' ')}</h2>
      <p className="mt-2 text-sm text-slate-500">This module is currently under construction.</p>
    </div>
  );
}