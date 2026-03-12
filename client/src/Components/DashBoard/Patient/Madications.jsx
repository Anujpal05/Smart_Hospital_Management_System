import React, { useState, useMemo } from 'react';
import { 
  Pill, 
  Plus, 
  Printer, 
  ChevronRight, 
  AlertTriangle, 
  Activity, 
  CalendarCheck, 
  Search, 
  X, 
  Trash2, 
  CheckCircle2, 
  Circle
} from 'lucide-react';
import { InputField } from './InputField';

const MEDICATION_SUGGESTIONS = [
  "Amoxicillin", "Atorvastatin", "Azithromycin", "Ciprofloxacin", "Clopidogrel", 
  "Gabapentin", "Hydrochlorothiazide", "Ibuprofen", "Insulin Glargine", "Lisinopril", 
  "Losartan", "Metformin", "Metoprolol", "Omeprazole", "Pantoprazole", "Sertraline", 
  "Simvastatin", "Tamsulosin", "Warfarin"
];

const DOSE_UNITS = [
  "Tablet(s)", "Capsule(s)", "ml", "mg", "mcg", "Drop(s)", "Puff(s)", "Patch", "Unit(s)", "tsp"
];

const INITIAL_PRESCRIPTIONS = [
  { id: 1, name: "Metformin", dosage: "1 Tablet (850mg)", route: "Oral", freq: "BID", instructions: "With food", status: "Ongoing" },
  { id: 2, name: "Lisinopril", dosage: "1 Tablet (10mg)", route: "Oral", freq: "QD", instructions: "Morning", status: "Ongoing" }
];

const Madications = () => {
  const [prescriptions, setPrescriptions] = useState(INITIAL_PRESCRIPTIONS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    amount: "1",
    unit: "Tablet(s)",
    strength: "", // Optional strength like 500mg
    freq: "TID",
    route: "Oral",
    instructions: ""
  });

  const currentDate = useMemo(() => {
    return new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }).toUpperCase();
  }, []);

  const filteredSuggestions = useMemo(() => {
    if (!searchQuery) return [];
    return MEDICATION_SUGGESTIONS.filter(med => 
      med.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const scheduleSlots = useMemo(() => {
    const slots = [
      { id: 'morning', label: 'Morning (08:00 AM)', frequencies: ['QD', 'BID', 'TID', 'QID'] },
      { id: 'afternoon', label: 'Afternoon (01:30 PM)', frequencies: ['TID', 'QID'] },
      { id: 'night', label: 'Night (09:00 PM)', frequencies: ['BID', 'TID', 'QID'] }
    ];

    return slots.map(slot => ({
      ...slot,
      meds: prescriptions.filter(m => slot.frequencies.includes(m.freq))
    }));
  }, [prescriptions]);

  const handleAddPrescription = (e) => {
    e.preventDefault();
    
    // Combine amount, unit, and strength for the display dosage
    const formattedDosage = `${formData.amount} ${formData.unit} ${formData.strength ? `(${formData.strength})` : ''}`;

    const newMed = {
      id: Date.now(),
      name: searchQuery || formData.name,
      dosage: formattedDosage,
      freq: formData.freq,
      route: formData.route,
      instructions: formData.instructions || "None",
      status: "Ongoing"
    };

    setPrescriptions([newMed, ...prescriptions]);
    setIsModalOpen(false);
    resetForm();
  };

  const removeMed = (id) => {
    setPrescriptions(prescriptions.filter(p => p.id !== id));
  };

  const resetForm = () => {
    setFormData({ name: "", amount: "1", unit: "Tablet(s)", strength: "", freq: "TID", route: "Oral", instructions: "" });
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
              <Pill className="text-blue-500 w-7 h-7" />
              Medication Management
            </h1>
          <div>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium transition-all flex items-center gap-2 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              Prescribe New
            </button>
            <button className="bg-white border border-slate-200 text-slate-700 px-4 py-2.5 rounded-xl font-medium hover:bg-slate-50 transition-all shadow-sm">
              <Printer className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Patient Brief Info Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-8 flex flex-wrap gap-8 items-center">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden">
              <img src="https://ui-avatars.com/api/?name=John+Doe&background=e2e8f0&color=475569" alt="Patient" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-800 leading-tight">John Doe</h2>
              <p className="text-sm text-slate-500">PID-882934 | Male, 42 yrs</p>
            </div>
          </div>
          <div className="h-10 w-px bg-slate-200 hidden md:block"></div>
          <div>
            <p className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-1">Blood Group</p>
            <p className="text-sm font-semibold text-slate-800">A Positive (A+)</p>
          </div>
          <div className="h-10 w-px bg-slate-200 hidden md:block"></div>
          <div className="flex-1 min-w-[200px] bg-red-50 border border-red-100 rounded-xl p-3">
            <p className="text-xs uppercase tracking-wider text-red-600 font-bold mb-1 flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5" /> Critical Allergies
            </p>
            <p className="text-sm font-medium text-red-800">Penicillin, Peanuts, Sulfa Drugs</p>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="flex border-b border-slate-100 px-6 pt-4">
                <button className="px-4 py-3 text-blue-600 border-b-2 border-blue-600 font-semibold text-sm">
                  Active Prescriptions ({prescriptions.length})
                </button>
                <button className="px-4 py-3 text-slate-500 hover:text-slate-700 font-medium text-sm transition-colors">
                  Past History
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-50/50 text-slate-500 text-xs uppercase tracking-wider">
                      <th className="px-6 py-4 font-bold">Medication</th>
                      <th className="px-6 py-4 font-bold">Schedule</th>
                      <th className="px-6 py-4 font-bold">Status</th>
                      <th className="px-6 py-4 font-bold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {prescriptions.map((med) => (
                      <tr key={med.id} className="hover:bg-slate-50/50 transition-colors group">
                        <td className="px-6 py-4">
                          <p className="font-bold text-slate-800">{med.name}</p>
                          <p className="text-xs text-slate-600 font-medium bg-slate-100 inline-block px-1.5 py-0.5 rounded mt-0.5">{med.dosage}</p>
                          <p className="text-[11px] text-slate-500 mt-1">{med.route} | {med.instructions}</p>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="text-sm font-medium text-slate-700">{med.freq}</span>
                            <span className="text-[11px] text-slate-400">Regular Schedule</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 rounded-md bg-emerald-50 text-emerald-600 text-[10px] font-bold uppercase tracking-wider">
                            {med.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button 
                            onClick={() => removeMed(med.id)}
                            className="text-slate-300 hover:text-red-500 transition-colors p-2"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Activity className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-medium">Medication Adherence</p>
                  <p className="text-xl font-bold text-slate-800">92%</p>
                </div>
              </div>
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
                  <CalendarCheck className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-medium">System Alert</p>
                  <p className="text-sm font-bold text-slate-800 leading-tight">No drug-drug interactions detected</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col min-h-[500px]">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                <h3 className="font-bold text-slate-800">Today's Schedule</h3>
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">
                  {currentDate}
                </span>
              </div>
              <div className="p-6 space-y-6 overflow-y-auto max-h-[600px] scrollbar-thin scrollbar-thumb-slate-200">
                {scheduleSlots.map((slot, index) => (
                  <div 
                    key={slot.id} 
                    className={`relative pl-6 ${index !== scheduleSlots.length - 1 ? 'pb-2 border-l-2' : ''} ${index === 0 ? 'border-blue-100' : 'border-slate-100'}`}
                  >
                    <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-4 border-white ${index === 0 ? 'bg-blue-500' : 'bg-slate-300'}`}></div>
                    <p className={`text-xs font-bold uppercase tracking-tighter mb-2 ${index === 0 ? 'text-blue-500' : 'text-slate-400'}`}>
                      {slot.label}
                    </p>
                    <div className="space-y-3">
                      {slot.meds.length > 0 ? (
                        slot.meds.map(m => (
                          <div key={m.id} className="bg-slate-50 rounded-xl p-3 flex justify-between items-center group transition-all hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-100">
                            <div className="flex items-center gap-3">
                              <div className={`w-2 h-2 rounded-full ${index === 0 ? 'bg-emerald-400' : 'bg-slate-300'}`}></div>
                              <div>
                                <p className="text-sm font-bold text-slate-700">{m.name}</p>
                                <p className="text-[10px] text-slate-500">{m.dosage}</p>
                              </div>
                            </div>
                            {index === 0 ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Circle className="w-4 h-4 text-slate-200" />}
                          </div>
                        ))
                      ) : (
                        <p className="text-[10px] text-slate-300 italic">No doses scheduled</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Prescription Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h3 className="text-xl font-bold text-slate-800">New Prescription</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 cursor-pointer hover:text-slate-600 p-2">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-8">
              <form onSubmit={handleAddPrescription} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Med Search */}
                  <div className="space-y-2 relative">
                    <label className="text-sm font-semibold text-slate-700">Medication Name</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                      <input 
                        type="text" 
                        value={searchQuery}
                        onChange={(e) => {setSearchQuery(e.target.value); setShowSuggestions(true);}}
                        onFocus={() => setShowSuggestions(true)}
                        placeholder="Search medication..." 
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        required
                      />
                    </div>
                    {showSuggestions && filteredSuggestions.length > 0 && (
                      <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-slate-200 rounded-xl shadow-xl z-50 max-h-48 overflow-y-auto">
                        {filteredSuggestions.map(suggestion => (
                          <div 
                            key={suggestion}
                            onClick={() => {setSearchQuery(suggestion); setShowSuggestions(false);}}
                            className="p-3 text-sm text-slate-700 hover:bg-slate-50 cursor-pointer border-b border-slate-50 last:border-0"
                          >
                            {suggestion}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Dosage: Split into Amount and Unit */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Dose Amount</label>
                    <div className="flex gap-2">
                        <input 
                            type="number" 
                            step="0.5"
                            value={formData.amount}
                            onChange={(e) => setFormData({...formData, amount: e.target.value})}
                            className="w-24 px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
                            required 
                        />
                        <select 
                            value={formData.unit}
                            onChange={(e) => setFormData({...formData, unit: e.target.value})}
                            className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        >
                            {DOSE_UNITS.map(unit => <option key={unit} value={unit}>{unit}</option>)}
                        </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Strength (Optional)</label>
                    <input 
                      type="text" 
                      value={formData.strength}
                      onChange={(e) => setFormData({...formData, strength: e.target.value})}
                      placeholder="e.g. 500mg" 
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-md focus:ring-1 focus:ring-blue-500 focus:bg-white outline-none transition-all text-slate-700 placeholder:text-slate-300" 
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Route</label>
                    <select 
                      value={formData.route}
                      onChange={(e) => setFormData({...formData, route: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-md focus:ring-1 focus:ring-blue-500 focus:bg-white outline-none transition-all text-slate-700 placeholder:text-slate-300"
                    >
                      <option>Oral</option>
                      <option>Intravenous (IV)</option>
                      <option>Inhalation</option>
                      <option>Topical</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Frequency</label>
                    <select 
                      value={formData.freq}
                      onChange={(e) => setFormData({...formData, freq: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-md focus:ring-1 focus:ring-blue-500 focus:bg-white outline-none transition-all text-slate-700 placeholder:text-slate-300"
                    >
                      <option value="QD">Once daily (QD)</option>
                      <option value="BID">Twice daily (BID)</option>
                      <option value="TID">Thrice daily (TID)</option>
                      <option value="QID">Four times daily (QID)</option>
                      <option value="PRN">As needed (PRN)</option>
                    </select>
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-semibold text-slate-700">Special Instructions</label>
                    <textarea 
                      rows="2" 
                      value={formData.instructions}
                      onChange={(e) => setFormData({...formData, instructions: e.target.value})}
                      placeholder="e.g. Take after meals, avoid dairy..." 
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-md focus:ring-1 focus:ring-blue-500 focus:bg-white outline-none transition-all text-slate-700 placeholder:text-slate-300"
                    ></textarea>
                  </div>
                </div>
                
                <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-100 transition-all">Cancel</button>
                  <button type="submit" className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 shadow-lg transition-all">Create Prescription</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Madications;