import React, { useState, useCallback } from 'react';
import { 
  User, 
  Calendar, 
  ClipboardList, 
  Stethoscope, 
  FileText, 
  Save, 
  Trash2, 
  ArrowRight, 
  Camera, 
  Hash,
  Clock,
  Activity,
  CreditCard,
  AlertCircle,
  UserCheck,
  CheckCircle2,
  Loader2
} from 'lucide-react';
import { InputField, SectionHeader, TextAreaField } from '../DashBoard/Patient/InputField';
import { INITIAL_APPOINTMENT } from '../../Data/patientdata';



const ScheduleAppointment = () => {
  const [formData, setFormData] = useState(INITIAL_APPOINTMENT);
  const [isSaving, setIsSaving] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleChange = useCallback((section, field, value) => {
    setFormData(prev => {
      if (section === null) {
        return { ...prev, [field]: value }
      }
      return {
        ...prev,
        [section]: { ...prev[section], [field]: value }
      }
    })
  }, []);

  const handleFinalSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      console.log("Appointment Finalized:", formData);
      setIsSaving(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }, 1200);
  };

  return (
    <div className="min-h-screen font-sans selection:bg-blue-200 antialiased">
      
      {/* --- HUD HEADER --- */}
      <div className="px-8 pt-4 flex items-center justify-between ">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-blue-700 flex items-center justify-center text-white ">
            <Calendar size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-800 mb-0.5">Appointment Manager</h1>
            <div className=" text-sm text-slate-500 ">
               Resource Allocation Dashboard
            </div>
          </div>
        </div>
        
       
      </div>

      {/* --- TOAST --- */}
      {showToast && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] bg-blue-700 text-white px-10 py-5 rounded-[2rem] shadow-2xl flex items-center gap-4 animate-in fade-in slide-in-from-bottom-10 border border-slate-700">
          <CheckCircle2 size={24} className="text-green-400" />
          <span className="font-black text-xs uppercase tracking-[0.25em]">Schedule Synced Successfully</span>
        </div>
      )}

      {/* --- MAIN CONTENT AREA --- */}
     <main className="max-w-7xl mx-auto p-6 lg:p-6">

  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

    {/* SECTION 1 */}
    <div className="bg-white rounded-2xl  shadow-sm p-8">
      <SectionHeader 
        icon={User} 
        title="Identity Check" 
        subtitle="Patient Verification & Metadata" 
      />

      <InputField
        label="Dossier ID"
        value={formData.patientId}
        onChange={(v) => handleChange(null,'patientId',v)}
      />

      <InputField
        label="Legal Name"
        value={formData.patientName}
        onChange={(v) => handleChange(null,'patientName',v)}
      />

      <InputField
        label="Current Age"
        type="number"
        value={formData.basic.age}
        onChange={(v) => handleChange('basic','age',v)}
      />

      <InputField
        label="Phone Contact"
        value={formData.basic.phone}
        onChange={(v) => handleChange('basic','phone',v)}
      />
    </div>


    {/* SECTION 2 */}
    <div className="bg-white rounded-2xl  shadow-sm p-8">
      <SectionHeader
        icon={Calendar}
        title="Provider Logistics"
        subtitle="Department & Consultant Allocation"
      />

      <InputField
        label="Consultant"
        value={formData.logistics.doctor}
        onChange={(v)=>handleChange('logistics','doctor',v)}
      />

      <InputField
        label="Visit Date"
        type="date"
        value={formData.logistics.date}
        onChange={(v)=>handleChange('logistics','date',v)}
      />

      <InputField
        label="Slot Time"
        type="time"
        value={formData.logistics.time}
        onChange={(v)=>handleChange('logistics','time',v)}
      />
    </div>


    {/* SECTION 3 */}
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
      <SectionHeader
        icon={ClipboardList}
        title="Clinical Assessment"
        subtitle="Symptoms & Medical History"
      />

      <TextAreaField
        label="Chief Complaint"
        value={formData.medical.symptoms}
        onChange={(v)=>handleChange('medical','symptoms',v)}
      />

      <InputField
        label="Conditions"
        value={formData.medical.existingConditions}
        onChange={(v)=>handleChange('medical','existingConditions',v)}
      />

      <InputField
        label="Allergies"
        value={formData.medical.allergies}
        onChange={(v)=>handleChange('medical','allergies',v)}
      />
    </div>


    {/* SECTION 4 */}
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
      <SectionHeader
        icon={FileText}
        title="Administration"
        subtitle="Billing Protocol & Priority"
      />

      <InputField
        label="Priority"
        value={formData.admin.priority}
        onChange={(v)=>handleChange('admin','priority',v)}
      />

      <InputField
        label="Settlement"
        value={formData.admin.paymentType}
        onChange={(v)=>handleChange('admin','paymentType',v)}
      />

      <TextAreaField
        label="Staff Notes"
        value={formData.admin.notes}
        onChange={(v)=>handleChange('admin','notes',v)}
      />
    </div>

  </div>


  {/* FINAL BUTTON */}
  <div className=' flex justify-end'>
  <div className="flex items-center mt-10 gap-4">
          <button className="hidden sm:flex items-center gap-2 text-slate-400 hover:text-red-500 font-black text-[10px] uppercase tracking-widest transition-colors">
            <Trash2 size={16} /> Reset
          </button>
          <button 
            onClick={handleFinalSave}
            disabled={isSaving}
            className="flex items-center gap-3 bg-blue-600 text-white px-10 py-4 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] shadow-2xl shadow-blue-200 hover:bg-blue-700 hover:-translate-y-0.5 transition-all disabled:opacity-50 active:translate-y-0"
          >
            {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
            {isSaving ? "Finalizing..." : "Finalize Appointment"}
          </button>
        </div>
  </div>

</main>




      <style>{`
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slide-in-from-bottom-4 { from { transform: translateY(1rem); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .animate-in { animation-duration: 0.5s; animation-fill-mode: both; }
        .fade-in { animation-name: fade-in; }
        .slide-in-from-bottom-4 { animation-name: slide-in-from-bottom-4; }
        
        select {
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2394a3b8' stroke-width='4'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 1.2rem center;
          background-size: 1.2rem;
          padding-right: 3.5rem;
        }

        input[type=number]::-webkit-outer-spin-button,
        input[type=number]::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
      `}</style>
    </div>
  );
};

export default ScheduleAppointment;
  