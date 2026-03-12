
import React, { useCallback, useEffect, useState } from 'react';
import { 
  User, 
  Phone, 
  Shield, 
  Heart, 
  Stethoscope, 
  Beaker, 
  CreditCard, 
  Save,
  Trash2,
  ArrowRight,
  Camera,
  ClipboardList,
  AlertCircle,
  Hash
} from 'lucide-react';
import {InputField ,TextAreaField ,SectionHeader} from './InputField';
import { INITIAL_RECORD } from '../../../Data/patientdata';

 const sections = [
    { id: 'basic', label: 'Basic Info', icon: User },
    { id: 'contact', label: 'Contact Details', icon: Phone },
    { id: 'identification', label: 'Identification', icon: Shield },
    { id: 'emergency', label: 'Emergency Contact', icon: Heart },
    { id: 'referral', label: 'Doctor Referral', icon: Stethoscope },
    { id: 'sample', label: 'Sample Details', icon: Beaker },
    { id: 'clinical', label: 'Clinical Info', icon: ClipboardList },
    { id: 'billing', label: 'Billing & Payment', icon: CreditCard },
  ];
  // const sectionOrder = sections.map(s => s.id);

const AddNewPatient = () => {
  const [formData, setFormData] = useState(INITIAL_RECORD);
  const [activeSection, setActiveSection] = useState('basic');
  

 const handleChange = useCallback((section, field, value) => {
  setFormData(prev => {
    if (section === null) {
      return { ...prev, [field]: value }
    }

    return {
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }
  })
}, [])


  const handleSaveSection = () => {

  const currentIndex = sections.map(s => s.id).indexOf(activeSection);
  const nextSection = sections.map(s => s.id)[currentIndex + 1];

  if (nextSection) {
    setActiveSection(nextSection);
  }

  // scroll page to top
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
  console.log(formData)

};

// const handleDiscardSection = () => {

//   if (activeSection === "basic") {
//     setFormData(prev => ({
//       ...prev,
//       patientId: INITIAL_RECORD.patientId,
//       labId: INITIAL_RECORD.labId,
//       firstName: INITIAL_RECORD.firstName,
//       middleName: INITIAL_RECORD.middleName,
//       lastName: INITIAL_RECORD.lastName,
//       fullName: INITIAL_RECORD.fullName,
//       gender: INITIAL_RECORD.gender,
//       age: INITIAL_RECORD.age,
//       dateOfBirth: INITIAL_RECORD.dateOfBirth,
//       maritalStatus: INITIAL_RECORD.maritalStatus,
//       bloodGroup: INITIAL_RECORD.bloodGroup,
//       nationality: INITIAL_RECORD.nationality
//     }));
//   }

//   if (activeSection === "contact") {
//     setFormData(prev => ({
//       ...prev,
//       contact: INITIAL_RECORD.contact
//     }));
//   }

//   if (activeSection === "identification") {
//     setFormData(prev => ({
//       ...prev,
//       identification: INITIAL_RECORD.identification
//     }));
//   }

//   if (activeSection === "emergency") {
//     setFormData(prev => ({
//       ...prev,
//       emergencyContact: INITIAL_RECORD.emergencyContact
//     }));
//   }

//   if (activeSection === "referral") {
//     setFormData(prev => ({
//       ...prev,
//       doctorReferral: INITIAL_RECORD.doctorReferral
//     }));
//   }

//   if (activeSection === "sample") {
//     setFormData(prev => ({
//       ...prev,
//       sampleDetails: INITIAL_RECORD.sampleDetails
//     }));
//   }

//   if (activeSection === "clinical") {
//     setFormData(prev => ({
//       ...prev,
//       clinicalInformation: INITIAL_RECORD.clinicalInformation
//     }));
//   }

//   if (activeSection === "billing") {
//     setFormData(prev => ({
//       ...prev,
//       billing: INITIAL_RECORD.billing
//     }));
//   }

// };


 

  


  return (
    <div className="min-h-screen  font-sans">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 items-start">
        
        {/* --- LEFT SIDEBAR NAV --- */}
        <aside className="w-full lg:w-80  space-y-4">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center text-center">
            <div className="relative group mb-6">
              <img 
                src={formData.profilePhoto} 
                alt="Profile" 
                className="w-32 h-32 rounded-2xl object-cover ring-8 ring-blue-50 transition-all group-hover:ring-blue-100"
              />
              <button className="absolute bottom-0 right-0 bg-blue-600 p-3 rounded-2xl text-white shadow-xl hover:scale-110 transition-transform">
                <Camera size={16} />
              </button>
            </div>
            <h1 className="text-xl font-black text-slate-800">{formData.firstName} {formData.lastName}</h1>
            <div className="flex items-center gap-2 mt-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-full font-bold text-[10px] uppercase tracking-tighter">
              <Hash size={10} /> {formData.patientId}
            </div>
          </div>

          <nav className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 space-y-2">
            {sections.map(section => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all group ${
                  activeSection === section.id 
                  ? 'bg-blue-600 text-white font-black shadow-xl shadow-blue-200' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                }`}
              >
                <div className={`shrink-0 p-2 rounded-xl ${activeSection === section.id ? 'bg-white/20' : 'bg-slate-100 text-slate-400 group-hover:text-blue-500'}`}>
                  <section.icon size={16} />
                </div>
                <span className="text-sm tracking-tight">{section.label}</span>
                {activeSection === section.id && <ArrowRight size={14} className="ml-auto animate-pulse" />}
              </button>
            ))}
          </nav>
        </aside>

        {/* --- MAIN FORM CONTENT (Side-by-Side Fields) --- */}
        <main className="flex-grow w-full">
          <div className="bg-white rounded-2xl shadow-2xl shadow-slate-300/50 border border-slate-200 p-8 lg:p-16 min-h-[800px]">
            
            {/* Section: BASIC INFO */}
            {activeSection === 'basic' && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                <SectionHeader icon={User} title="Basic Information" subtitle="Demographic details and primary identity" />
                <div className="max-w-3xl">
                  <InputField label="Patient ID" value={formData.patientId} onChange={(v) => handleChange(null, 'patientId', v)} />
                  <InputField label="Lab ID" value={formData.labId} onChange={(v) => handleChange(null, 'labId', v)} />
                  <InputField label="First Name" value={formData.firstName} onChange={(v) => handleChange(null, 'firstName', v)} />
                  <InputField label="Middle Name" value={formData.middleName} onChange={(v) => handleChange(null, 'middleName', v)} />
                  <InputField label="Last Name" value={formData.lastName} onChange={(v) => handleChange(null, 'lastName', v)} />
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 items-center mb-4">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 sm:text-right sm:pr-6">Gender</label>
                    <div className="sm:col-span-2">
                      <select value={formData.gender} onChange={(e) => handleChange(null, 'gender', e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 font-medium text-slate-700">
                        <option>Male</option><option>Female</option><option>Other</option>
                      </select>
                    </div>
                  </div>

                  <InputField label="DOB" type="date" value={formData.dateOfBirth} onChange={(v) => handleChange(null, 'dateOfBirth', v)} />
                  <InputField label="Age" type="number" value={formData.age} onChange={(v) => handleChange(null, 'age', v)} />
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 items-center mb-4">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 sm:text-right sm:pr-6">Blood Group</label>
                    <div className="sm:col-span-2">
                      <select value={formData.bloodGroup} onChange={(e) => handleChange(null, 'bloodGroup', e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 font-medium text-slate-700">
                        {['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'].map(bg => <option key={bg}>{bg}</option>)}
                      </select>
                    </div>
                  </div>

                  <InputField label="Marital Status" value={formData.maritalStatus} onChange={(v) => handleChange(null, 'maritalStatus', v)} />
                  <InputField label="Nationality" value={formData.nationality} onChange={(v) => handleChange(null, 'nationality', v)} />
                </div>
              </div>
            )}

            {/* Section: CONTACT DETAILS */}
            {activeSection === 'contact' && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                <SectionHeader icon={Phone} title="Contact Details" subtitle="Primary communication and residential data" />
                <div className="max-w-3xl">
                  <InputField label="Mobile Number" value={formData.contact.mobileNumber} onChange={(v) => handleChange('contact', 'mobileNumber', v)} />
                  <InputField label="Alt Phone" value={formData.contact.alternatePhone} onChange={(v) => handleChange('contact', 'alternatePhone', v)} />
                  <InputField label="Email Address" value={formData.contact.email} onChange={(v) => handleChange('contact', 'email', v)} />
                  <div className="h-4" />
                  <InputField label="Address Line 1" value={formData.contact.addressLine1} onChange={(v) => handleChange('contact', 'addressLine1', v)} />
                  <InputField label="Address Line 2" value={formData.contact.addressLine2} onChange={(v) => handleChange('contact', 'addressLine2', v)} />
                  <InputField label="City" value={formData.contact.city} onChange={(v) => handleChange('contact', 'city', v)} />
                  <InputField label="State" value={formData.contact.state} onChange={(v) => handleChange('contact', 'state', v)} />
                  <InputField label="Country" value={formData.contact.country} onChange={(v) => handleChange('contact', 'country', v)} />
                  <InputField label="Postal Code" value={formData.contact.postalCode} onChange={(v) => handleChange('contact', 'postalCode', v)} />
                </div>
              </div>
            )}

            {/* Section: IDENTIFICATION */}
            {activeSection === 'identification' && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                <SectionHeader icon={Shield} title="Identification" subtitle="Legal identity and medical insurance" />
                <div className="max-w-3xl space-y-2">
                  <InputField label="Govt ID Type" value={formData.identification.governmentIdType} onChange={(v) => handleChange('identification', 'governmentIdType', v)} />
                  <InputField label="Govt ID No" value={formData.identification.governmentIdNumber} onChange={(v) => handleChange('identification', 'governmentIdNumber', v)} />
                  <InputField label="Passport No" value={formData.identification.passportNumber} onChange={(v) => handleChange('identification', 'passportNumber', v)} />
                  <InputField label="PAN Number" value={formData.identification.panNumber} onChange={(v) => handleChange('identification', 'panNumber', v)} />
                  
                  <div className="pt-8 mb-6">
                    <div className="flex items-center gap-2 mb-6 px-4 py-2 bg-blue-50 border border-blue-100 rounded-xl text-blue-700 font-bold text-[10px] uppercase tracking-widest w-fit">
                      <CreditCard size={12} /> Insurance Provider Details
                    </div>
                    <InputField label="Ins. Provider" value={formData.identification.insuranceProvider} onChange={(v) => handleChange('identification', 'insuranceProvider', v)} />
                    <InputField label="Insurance ID" value={formData.identification.insuranceId} onChange={(v) => handleChange('identification', 'insuranceId', v)} />
                    <InputField label="Policy Number" value={formData.identification.insurancePolicyNumber} onChange={(v) => handleChange('identification', 'insurancePolicyNumber', v)} />
                  </div>
                </div>
              </div>
            )}

            {/* Section: EMERGENCY CONTACT */}
            {activeSection === 'emergency' && (
              <div className="animate-in slide-in-from-right-4 duration-500">
                <SectionHeader icon={Heart} title="Emergency Contact" subtitle="Next of kin for critical medical decisions" />
                <div className="max-w-3xl">
                  <InputField label="Full Name" value={formData.emergencyContact.name} onChange={(v) => handleChange('emergencyContact', 'name', v)} />
                  <InputField label="Relationship" value={formData.emergencyContact.relationship} onChange={(v) => handleChange('emergencyContact', 'relationship', v)} />
                  <InputField label="Contact Phone" value={formData.emergencyContact.phone} onChange={(v) => handleChange('emergencyContact', 'phone', v)} />
                  <InputField label="Address Notes" value={formData.emergencyContact.address} onChange={(v) => handleChange('emergencyContact', 'address', v)} />
                  
                  <div className="mt-12 bg-red-50 p-8 rounded-2xl border border-red-100 flex items-start gap-6">
                    <div className="p-3 bg-red-500 text-white rounded-2xl shadow-lg shadow-red-200 shrink-0">
                      <AlertCircle size={24} />
                    </div>
                    <div>
                      <h4 className="font-black text-red-900 text-sm uppercase tracking-wider">Clinical Responsibility</h4>
                      <p className="text-red-700 text-[13px] mt-2 leading-relaxed font-medium">This contact is legally authorized to sign procedural consent forms and will be contacted in the event of unforeseen complications during surgery or admission.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Section: DOCTOR REFERRAL */}
            {activeSection === 'referral' && (
              <div className="animate-in slide-in-from-right-4 duration-500">
                <SectionHeader icon={Stethoscope} title="Doctor Referral" subtitle="Referring clinic and medical department" />
                <div className="max-w-3xl">
                  <InputField label="Ref. Doctor" value={formData.doctorReferral.referringDoctorName} onChange={(v) => handleChange('doctorReferral', 'referringDoctorName', v)} />
                  <InputField label="Department" value={formData.doctorReferral.department} onChange={(v) => handleChange('doctorReferral', 'department', v)} />
                  <InputField label="Contact No" value={formData.doctorReferral.doctorContact} onChange={(v) => handleChange('doctorReferral', 'doctorContact', v)} />
                  <InputField label="Hospital" value={formData.doctorReferral.hospitalName} onChange={(v) => handleChange('doctorReferral', 'hospitalName', v)} />
                  <InputField label="Hospital Addr" value={formData.doctorReferral.hospitalAddress} onChange={(v) => handleChange('doctorReferral', 'hospitalAddress', v)} />
                </div>
              </div>
            )}

            {/* Section: SAMPLE DETAILS */}
            {activeSection === 'sample' && (
              <div className="animate-in slide-in-from-right-4 duration-500">
                <SectionHeader icon={Beaker} title="Sample Collection" subtitle="Laboratory specimen tracking and logs" />
                <div className="max-w-3xl">
                  <InputField label="Sample ID" value={formData.sampleDetails.sampleId} onChange={(v) => handleChange('sampleDetails', 'sampleId', v)} />
                  <InputField label="Sample Type" value={formData.sampleDetails.sampleType} onChange={(v) => handleChange('sampleDetails', 'sampleType', v)} />
                  <InputField label="Condition" value={formData.sampleDetails.sampleCondition} onChange={(v) => handleChange('sampleDetails', 'sampleCondition', v)} />
                  <InputField label="Coll. Date" type="date" value={formData.sampleDetails.collectionDate} onChange={(v) => handleChange('sampleDetails', 'collectionDate', v)} />
                  <InputField label="Coll. Time" value={formData.sampleDetails.collectionTime} onChange={(v) => handleChange('sampleDetails', 'collectionTime', v)} />
                  <InputField label="Collected By" value={formData.sampleDetails.collectedBy} onChange={(v) => handleChange('sampleDetails', 'collectedBy', v)} />
                  <InputField label="Location" value={formData.sampleDetails.collectionLocation} onChange={(v) => handleChange('sampleDetails', 'collectionLocation', v)} />
                  <InputField label="Sample Notes" value={formData.sampleDetails.sampleNotes} onChange={(v) => handleChange('sampleDetails', 'sampleNotes', v)} />
                </div>
              </div>
            )}

            {/* Section: CLINICAL INFO */}
            {activeSection === 'clinical' && (
              <div className="animate-in slide-in-from-right-4 duration-500">
                <SectionHeader icon={ClipboardList} title="Clinical Information" subtitle="Current symptoms and medical history" />
                <div className="max-w-3xl">
                  <TextAreaField label="Symptoms" value={formData.clinicalInformation.symptoms} onChange={(v) => handleChange('clinicalInformation', 'symptoms', v)} />
                  <TextAreaField label="Diagnosis" value={formData.clinicalInformation.diagnosis} onChange={(v) => handleChange('clinicalInformation', 'diagnosis', v)} />
                  <InputField label="Allergies" value={formData.clinicalInformation.allergies} onChange={(v) => handleChange('clinicalInformation', 'allergies', v)} />
                  <InputField label="Medications" value={formData.clinicalInformation.currentMedications} onChange={(v) => handleChange('clinicalInformation', 'currentMedications', v)} />
                  <InputField label="History" value={formData.clinicalInformation.clinicalHistory} onChange={(v) => handleChange('clinicalInformation', 'clinicalHistory', v)} />
                  <InputField label="Doctor Notes" value={formData.clinicalInformation.doctorNotes} onChange={(v) => handleChange('clinicalInformation', 'doctorNotes', v)} />
                </div>
              </div>
            )}

            {/* Section: BILLING */}
            {activeSection === 'billing' && (
              <div className="animate-in slide-in-from-right-4 duration-500">
                <SectionHeader icon={CreditCard} title="Billing Details" subtitle="Financial transaction and payment status" />
                <div className="max-w-3xl space-y-2">
                  <InputField label="Invoice No" value={formData.billing.invoiceNumber} onChange={(v) => handleChange('billing', 'invoiceNumber', v)} />
                  <InputField label="Test Cost" type="number" value={formData.billing.testCost} onChange={(v) => handleChange('billing', 'testCost', v)} />
                  <InputField label="Discount" type="number" value={formData.billing.discount} onChange={(v) => handleChange('billing', 'discount', v)} />
                  <InputField label="Tax" type="number" value={formData.billing.tax} onChange={(v) => handleChange('billing', 'tax', v)} />
                  
                  <div className="mt-12 bg-slate-900 rounded-2xl p-10 text-white flex flex-col md:flex-row justify-between items-center gap-8 shadow-2xl shadow-slate-400">
                    <div className="text-center md:text-left">
                      <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500 mb-2">Total Amount Payable</p>
                      <h3 className="text-5xl font-black">₹{formData.billing.totalAmount}</h3>
                    </div>
                    <div className="flex gap-4">
                      <div className="bg-slate-800 px-6 py-4 rounded-2xl border border-slate-700">
                        <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mb-1">Method</p>
                        <p className="text-sm font-bold tracking-tight">{formData.billing.paymentMode}</p>
                      </div>
                      <div className="bg-green-500/20 px-6 py-4 rounded-2xl border border-green-500/30 text-green-400">
                        <p className="text-[8px] font-bold text-green-500/60 uppercase tracking-widest mb-1">Status</p>
                        <p className="text-sm font-bold tracking-tight uppercase">{formData.billing.paymentStatus}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* --- GLOBAL FORM ACTIONS --- */}
            <div className="mt-16 flex flex-col md:flex-row gap-4  border-t border-slate-100 pt-10">
              <button   
              onClick={handleSaveSection} 
              className=" cursor-pointer flex-grow flex items-center justify-center gap-3 bg-blue-600 text-white font-black py-6 rounded-2xl shadow-2xl shadow-blue-200 hover:bg-blue-700 hover:-translate-y-1 active:translate-y-0 transition-all text-sm uppercase tracking-wider">
                <Save size={20} />
                Save Record
              </button>
              <button 
              // onClick={handleDiscardSection}
               className="px-12 cursor-pointer flex items-center justify-center gap-3 bg-slate-100 text-slate-400 font-bold py-6 rounded-2xl hover:bg-red-50 hover:text-red-500 transition-all text-sm uppercase tracking-wider">
                <Trash2 size={20} />
                Discard
              </button>
            </div>

          </div>
        </main>
      </div>

      <style>{`
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slide-in-from-right-4 { from { transform: translateX(2rem); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        .animate-in { animation-duration: 0.4s; animation-fill-mode: both; animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1); }
        .fade-in { animation-name: fade-in; }
        .slide-in-from-right-4 { animation-name: slide-in-from-right-4; }
        
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
        input[type=number] { -moz-appearance: textfield; }

        /* Modern Custom Select Reset */
        select {
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2394a3b8' stroke-width='3'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 1rem center;
          background-size: 1rem;
          padding-right: 2.5rem;
        }
      `}</style>
    </div>
  );
};

export default AddNewPatient;