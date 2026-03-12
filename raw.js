const patientRecord = {
  
  // ===============================
  // BASIC PATIENT INFORMATION
  // ===============================
  patientId: "PAT-2026-001", // Unique patient identifier in system
  labId: "LAB-02232160XXXX", // Lab report ID
  firstName: "Lyubochka",
  middleName: "",
  lastName: "Svetka",
  fullName: "Lyubochka Svetka",
  gender: "Male",
  age: 41,
  dateOfBirth: "1984-02-15",
  maritalStatus: "Married",
  bloodGroup: "O+",
  nationality: "Indian",
  profilePhoto: "https://example.com/images/patient1.jpg", // Patient photo URL


  // ===============================
  // CONTACT INFORMATION
  // ===============================
  contact: {
    mobileNumber: "+91 9876543210",
    alternatePhone: "+91 9876543211",
    email: "lyubochka.svetka@example.com",
    addressLine1: "12 Park Street",
    addressLine2: "Apartment 4B",
    city: "Surat",
    state: "Gujarat",
    country: "India",
    postalCode: "395007"
  },


  // ===============================
  // IDENTIFICATION DETAILS
  // ===============================
  identification: {
    governmentIdType: "Aadhaar",
    governmentIdNumber: "XXXX-XXXX-1234",
    passportNumber: "N1234567",
    panNumber: "ABCDE1234F",
    insuranceId: "INS-88422",
    insuranceProvider: "Star Health Insurance",
    insurancePolicyNumber: "POL-55883921"
  },


  // ===============================
  // EMERGENCY CONTACT
  // ===============================
  emergencyContact: {
    name: "Priya Svetka",
    relationship: "Wife",
    phone: "+91 9876543000",
    address: "Same as patient address"
  },


  // ===============================
  // DOCTOR / REFERRAL DETAILS
  // ===============================
  doctorReferral: {
    referringDoctorName: "Dr. Mehta",
    department: "General Medicine",
    doctorContact: "+91 9898989898",
    hospitalName: "City Care Hospital",
    hospitalAddress: "Ring Road, Surat"
  },


  // ===============================
  // SAMPLE COLLECTION DETAILS
  //   optinal field

  // ===============================
  sampleDetails: {
    sampleId: "SMP-2026-554",
    sampleType: "Blood",
    sampleCondition: "Good",
    collectionDate: "2026-03-09",
    collectionTime: "09:30 AM",
    collectedBy: "Lab Technician Rahul",
    collectionLocation: "Sterling Accuris Lab",
    sampleNotes: "Fasting sample"
  },


  // ===============================
  // TEST ORDER DETAILS
  //   optinal field

  // ===============================
  testOrders: [
    {
      testPanelName: "Complete Blood Count",
      testCode: "CBC001",
      testName: "Hemoglobin",
      testMethod: "Colorimetric",
      priorityLevel: "Normal",
      specialInstructions: "None"
    },
    {
      testPanelName: "Diabetes Panel",
      testCode: "DBS001",
      testName: "Fasting Blood Sugar",
      testMethod: "Enzymatic",
      priorityLevel: "Urgent",
      specialInstructions: "Patient fasting 10 hours"
    }
  ],


  // ===============================
  // LAB TEST RESULTS
  // ===============================
  //   optinal field

  testResults: [
    {
      testName: "Hemoglobin",
      result: 14.5,
      unit: "g/dL",
      referenceRange: "13.0 - 16.5",
      flag: "Normal", // Normal / High / Low
      method: "Colorimetric",
      technicianName: "Rahul Patel",
      approvedBy: "Dr. Yash Shah"
    },
    {
      testName: "Fasting Blood Sugar",
      result: 141,
      unit: "mg/dL",
      referenceRange: "74 - 106",
      flag: "High",
      method: "Enzymatic",
      technicianName: "Rahul Patel",
      approvedBy: "Dr. Yash Shah"
    }
  ],


  // ===============================
  // CLINICAL INFORMATION
  // ===============================
  clinicalInformation: {
    symptoms: "Fatigue, increased thirst",
    diagnosis: "Suspected Diabetes",
    clinicalHistory: "Family history of diabetes",
    allergies: "None",
    currentMedications: "Metformin",
    pastMedicalHistory: "Hypertension",
    doctorNotes: "Recommend follow-up in 1 month"
  },


  // ===============================
  // BILLING INFORMATION
//   optinal field
  // ===============================
  billing: {
    invoiceNumber: "INV-2026-883",
    testCost: 1500,
    discount: 200,
    tax: 50,
    totalAmount: 1350,
    paidAmount: 1350,
    balanceAmount: 0,
    paymentMode: "UPI",
    paymentStatus: "Paid"
  },


  // ===============================
  // REPORT INFORMATION
  // ===============================
  report: {
	// optional field 
    reportStatus: "Completed",
    reportGeneratedDate: "2026-03-09",
    reportApprovedDate: "2026-03-09",
    reportApprovedBy: "Dr. Sanjeev Shah",
    reportFileUrl: "https://example.com/reports/report_PAT-2026-001.pdf",
    qrCodeUrl: "https://example.com/qrcodes/report_PAT-2026-001.png"
  },


  // ===============================
  // SYSTEM METADATA
  // ===============================
  metadata: {
    createdBy: "Lab Assistant Ankit",
    createdDate: "2026-03-09T09:15:00Z",
    updatedBy: "Lab Assistant Ankit",
    updatedDate: "2026-03-09T10:30:00Z",
    recordStatus: "Active"
  }

};

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
  Thermometer
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-800">
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 transform transition-transform duration-200 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        flex flex-col
      `}>
        <div className="h-16 flex items-center px-6 border-b border-slate-200">
          <div className="flex items-center gap-2 text-blue-600">
            <Activity className="h-6 w-6" />
            <span className="text-xl font-bold tracking-tight">HealthCare+</span>
          </div>
          <button 
            className="ml-auto lg:hidden text-slate-400 hover:text-slate-600"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`
                  w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors text-sm font-medium
                  ${isActive 
                    ? 'bg-blue-50 text-blue-700' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`h-5 w-5 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                  {item.name}
                </div>
                {item.badge && (
                  <span className="bg-blue-100 text-blue-600 py-0.5 px-2 rounded-full text-xs font-bold">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-200">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
              JD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-900 truncate">John Doe</p>
              <p className="text-xs text-slate-500 truncate">ID: P-98234</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-200">
          <div className="flex items-center flex-1">
            <button 
              className="lg:hidden mr-4 text-slate-500 hover:text-slate-700"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="max-w-md w-full hidden sm:block relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-slate-400" />
              </div>
              <input 
                type="text" 
                placeholder="Search doctors, records, or articles..." 
                className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-50"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors rounded-full hover:bg-slate-100">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 border-2 border-white"></span>
            </button>
            <button className="hidden sm:flex items-center gap-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-lg transition-colors">
              <Plus className="h-4 w-4" />
              Book Appointment
            </button>
          </div>
        </header>

        {/* Dynamic Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {activeTab === 'dashboard' ? <DashboardHome /> : <PlaceholderTab name={activeTab} />}
        </div>
      </main>
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
        <div className="bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm flex items-center gap-3">
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
                <button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm shadow-sm">
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
        <div className={`p-2 rounded-lg ${bg}`}>
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
    <button className="flex flex-col items-center justify-center p-3 rounded-lg border border-slate-100 bg-slate-50 hover:bg-blue-50 hover:border-blue-100 transition-colors group relative">
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
    <div className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer group">
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