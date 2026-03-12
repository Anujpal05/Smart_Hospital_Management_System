import React, { useState, useRef, useEffect } from 'react';
import { 
  FileText, 
  User, 
  Activity, 
  Download, 
  Clipboard, 
  Trash2, 
  Plus,
  QrCode,
  ShieldCheck,
  Stethoscope,
  Loader2,
  MessageSquareQuote
} from 'lucide-react';

// --- Default Data for Seeding ---
const INITIAL_PATIENT = {
  name: "Lyubochka Svetka",
  age: "41",
  sex: "Male",
  labId: "02232160XXXX",
  regDate: "20-Feb-2023 09:10",
  collectedOn: "20-Feb-2023 08:53",
  sampleType: "EDTA Blood, Serum",
  refBy: "Dr. Self",
  passportNo: "N/A",
  remarks: "RBC Morphology: Normochromic Normocytic. WBCs Series shows normal morphology. Platelets are adequate with normal morphology. Malarial parasite is not detected."
};

const INITIAL_TESTS = [
  { id: 1, name: "Hemoglobin", result: "14.5", unit: "g/dL", ref: "13.0-16.5", flag: "" },
  { id: 2, name: "Fasting Blood Sugar", result: "141.0", unit: "mg/dL", ref: "74-106", flag: "H" },
  { id: 3, name: "HbA1c", result: "7.10", unit: "%", ref: "4.0-5.6", flag: "H" },
  { id: 4, name: "Cholesterol", result: "189.0", unit: "mg/dL", ref: "< 200", flag: "" },
];

const App = () => {
  const [patient, setPatient] = useState(INITIAL_PATIENT);
  const [tests, setTests] = useState(INITIAL_TESTS);
  const [isGenerating, setIsGenerating] = useState(false);
  const [libsLoaded, setLibsLoaded] = useState(false);
  const reportRef = useRef(null);

  // Load external libraries dynamically to avoid build-time resolution errors
  useEffect(() => {
    const loadScript = (src) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    };

    Promise.all([
      loadScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js'),
      loadScript('https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js')
    ])
    .then(() => setLibsLoaded(true))
    .catch(err => console.error("Failed to load PDF libraries", err));
  }, []);

  // --- Handlers ---
  const handlePatientChange = (e) => {
    const { name, value } = e.target;
    setPatient(prev => ({ ...prev, [name]: value }));
  };

  const handleTestChange = (id, field, value) => {
    setTests(prev => prev.map(t => t.id === id ? { ...t, [field]: value } : t));
  };

  const addTest = () => {
    const newId = tests.length > 0 ? Math.max(...tests.map(t => t.id)) + 1 : 1;
    setTests([...tests, { id: newId, name: "", result: "", unit: "", ref: "", flag: "" }]);
  };

  const removeTest = (id) => {
    setTests(tests.filter(t => t.id !== id));
  };

  const downloadPDF = async () => {
    if (!libsLoaded) return;
    setIsGenerating(true);
    
    const element = reportRef.current;
    
    try {
      // Use globals loaded from CDN
      const html2canvas = window.html2canvas;
      const { jsPDF } = window.jspdf;

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Report_${patient.labId || 'Patient'}.pdf`);
    } catch (error) {
      console.error("PDF Generation Error:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        
        {/* --- LEFT SIDE: Lab Assistant Input Form --- */}
        <div className="flex-1 space-y-6">
          <header className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg text-white">
              <Activity size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-800">Lab Assistant Portal</h1>
              <p className="text-sm text-slate-500">HMS Data Entry & Report Generation</p>
            </div>
          </header>

          {/* Patient Info Card */}
          <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 transition-all hover:shadow-md">
            <div className="flex items-center gap-2 mb-4 text-blue-600 font-semibold border-b pb-2">
              <User size={18} />
              <h2>Patient Information</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Full Name</label>
                <input 
                  name="name" value={patient.name} onChange={handlePatientChange}
                  className="w-full mt-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Age</label>
                  <input 
                    name="age" value={patient.age} onChange={handlePatientChange}
                    className="w-full mt-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Sex</label>
                  <select 
                    name="sex" value={patient.sex} onChange={handlePatientChange}
                    className="w-full mt-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
                  >
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Lab ID</label>
                <input 
                  name="labId" value={patient.labId} onChange={handlePatientChange}
                  className="w-full mt-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Sample Type</label>
                <input 
                  name="sampleType" value={patient.sampleType} onChange={handlePatientChange}
                  className="w-full mt-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Ref By</label>
                <input 
                  name="refBy" value={patient.refBy} onChange={handlePatientChange}
                  className="w-full mt-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
                />
              </div>
            </div>
          </section>

          {/* Lab Results Table */}
          <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 transition-all hover:shadow-md">
            <div className="flex items-center justify-between mb-4 border-b pb-2">
              <div className="flex items-center gap-2 text-blue-600 font-semibold">
                <Clipboard size={18} />
                <h2>Laboratory Test Results</h2>
              </div>
              <button 
                onClick={addTest}
                className="flex items-center gap-1 text-xs bg-blue-50 hover:bg-blue-100 text-blue-600 px-3 py-1.5 rounded-full font-bold transition-colors"
              >
                <Plus size={14} /> ADD TEST
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-slate-400 border-b">
                    <th className="pb-2 font-medium">Test Name</th>
                    <th className="pb-2 font-medium w-24">Result</th>
                    <th className="pb-2 font-medium w-20">Unit</th>
                    <th className="pb-2 font-medium">Ref. Interval</th>
                    <th className="pb-2 font-medium w-16 text-center">Flag</th>
                    <th className="pb-2 font-medium w-10"></th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {tests.map((test) => (
                    <tr key={test.id} className="group hover:bg-slate-50 transition-colors">
                      <td className="py-3 pr-2">
                        <input 
                          value={test.name} onChange={(e) => handleTestChange(test.id, 'name', e.target.value)}
                          placeholder="e.g. Hemoglobin"
                          className="w-full bg-transparent outline-none focus:text-blue-600 transition-all"
                        />
                      </td>
                      <td className="py-3 pr-2">
                        <input 
                          value={test.result} onChange={(e) => handleTestChange(test.id, 'result', e.target.value)}
                          placeholder="0.0"
                          className="w-full bg-transparent outline-none font-semibold text-slate-800"
                        />
                      </td>
                      <td className="py-3 pr-2 text-slate-500">
                        <input 
                          value={test.unit} onChange={(e) => handleTestChange(test.id, 'unit', e.target.value)}
                          placeholder="unit"
                          className="w-full bg-transparent outline-none"
                        />
                      </td>
                      <td className="py-3 pr-2 text-slate-500">
                        <input 
                          value={test.ref} onChange={(e) => handleTestChange(test.id, 'ref', e.target.value)}
                          placeholder="0-0"
                          className="w-full bg-transparent outline-none"
                        />
                      </td>
                      <td className="py-3 pr-2 text-center">
                        <select 
                          value={test.flag} onChange={(e) => handleTestChange(test.id, 'flag', e.target.value)}
                          className={`bg-transparent outline-none font-bold text-center ${test.flag === 'H' ? 'text-red-600' : 'text-blue-600'}`}
                        >
                          <option value=""></option>
                          <option value="H">H</option>
                          <option value="L">L</option>
                        </select>
                      </td>
                      <td className="py-3 text-right opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => removeTest(test.id)} className="text-slate-300 hover:text-red-500">
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Clinical Remarks Section (New Section) */}
          <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 transition-all hover:shadow-md">
            <div className="flex items-center gap-2 mb-4 text-blue-600 font-semibold border-b pb-2">
              <MessageSquareQuote size={18} />
              <h2>Clinical Remarks & Observations</h2>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Lab Technician Notes:</label>
              <textarea 
                name="remarks" 
                value={patient.remarks} 
                onChange={handlePatientChange}
                placeholder="Enter morphology details, parasite findings, or special notes..."
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all min-h-[100px] text-sm"
              />
            </div>
          </section>

          <button 
            onClick={downloadPDF}
            disabled={isGenerating || !libsLoaded}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-200 disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            {isGenerating ? (
              <Loader2 className="animate-spin" size={20} />
            ) : !libsLoaded ? (
              <span>Initializing Libraries...</span>
            ) : (
              <>
                <Download size={20} className="group-hover:-translate-y-1 transition-transform" />
                Generate & Export Official PDF
              </>
            )}
          </button>
        </div>

        {/* --- RIGHT SIDE: Live Report Preview --- */}
        <div className="w-full flex flex-col gap-2">
          <div className="flex items-center justify-between px-2">
            <span className="text-xs font-bold text-slate-400 uppercase flex items-center gap-1">
              <FileText size={14} /> Official Report Preview (A4)
            </span>
            <span className="text-[10px] text-slate-400 italic">Scroll to view full page</span>
          </div>
          
          <div className="overflow-auto bg-slate-800 p-8 rounded-2xl border-4 border-slate-700 shadow-2xl max-h-[90vh] custom-scrollbar">
            {/* The Actual Document View */}
            <div 
              ref={reportRef}
              className="bg-white shadow-2xl mx-auto p-12 text-[11px] leading-tight text-black w-[210mm] min-h-[297mm] flex flex-col font-serif"
              style={{ minWidth: '210mm' }}
            >
              {/* Report Header */}
              <div className="flex justify-between items-start border-b-4 border-blue-900 pb-6 mb-6">
                <div className="flex flex-col gap-1">
                  <div className="text-blue-900 font-bold text-3xl tracking-tighter italic">sterling <span className="text-slate-900 uppercase not-italic">ACCURIS</span></div>
                  <div className="text-[11px] text-blue-800 uppercase font-sans tracking-[0.2em] font-black">Pathology lab that cares</div>
                </div>
                <div className="flex gap-6 items-center uppercase font-sans text-[10px]">
                  <div className="text-right border-r-2 border-slate-200 pr-4">
                    <p className="font-black text-slate-900">National Reference Laboratory</p>
                    <p className="text-slate-500">101 to 109, Sankalp Square II</p>
                    <p className="text-slate-500">Ahmedabad, Gujarat-380006</p>
                    <p className="font-bold text-blue-900">Ph.: 812 813 0000</p>
                  </div>
                  <div className="bg-white p-1 border-2 border-slate-900">
                    <QrCode size={48} className="text-slate-900" />
                  </div>
                </div>
              </div>

              {/* Patient Detail Boxes */}
              <div className="grid grid-cols-2 gap-0 border-2 border-black text-[13px] mb-8">
                <div className="border-r-2 border-black p-3 space-y-2">
                  <div className="font-black border-b-2 border-black -mx-3 -mt-3 px-3 py-1 bg-slate-100 uppercase font-sans text-[11px] tracking-wider text-slate-800">Patient Information</div>
                  <div className="flex"><span className="w-28 font-black uppercase text-slate-600">Name</span><span className="font-bold">: {patient.name}</span></div>
                  <div className="flex"><span className="w-28 font-black uppercase text-slate-600">Sex/Age</span><span>: {patient.sex} / {patient.age} Y</span></div>
                  <div className="flex"><span className="w-28 font-black uppercase text-slate-600">Ref. By</span><span>: {patient.refBy}</span></div>
                </div>
                <div className="p-3 space-y-2">
                  <div className="font-black border-b-2 border-black -mx-3 -mt-3 px-3 py-1 bg-slate-100 uppercase font-sans text-[11px] tracking-wider text-slate-800">Sample Information</div>
                  <div className="flex"><span className="w-28 font-black uppercase text-slate-600">Lab Id</span><span className="font-bold">: {patient.labId}</span></div>
                  <div className="flex"><span className="w-28 font-black uppercase text-slate-600">Registration</span><span>: {patient.regDate}</span></div>
                  <div className="flex"><span className="w-28 font-black uppercase text-slate-600">Collected on</span><span>: {patient.collectedOn}</span></div>
                  <div className="flex"><span className="w-28 font-black uppercase text-slate-600">Sample Type</span><span>: {patient.sampleType}</span></div>
                </div>
              </div>

              <div className="text-center font-black text-[18px] uppercase tracking-[0.2em] mb-8 text-blue-900 border-y-2 border-slate-200 py-1">LABORATORY TEST REPORT</div>

              {/* Table Data */}
              <div className="flex-grow">
                <table className="w-full border-collapse mb-8 text-[13px]">
                  <thead className="border-y-2 border-black font-sans text-[12px] uppercase tracking-wider bg-slate-50">
                    <tr>
                      <th className="py-3 px-2 text-left">Test Name</th>
                      <th className="py-3 px-2 text-center w-28">Result</th>
                      <th className="py-3 px-2 text-left w-24">Unit</th>
                      <th className="py-3 px-2 text-left">Biological Ref. Interval</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tests.map((test, idx) => (
                      <tr key={idx} className="border-b border-slate-200 hover:bg-blue-50/30">
                        <td className="py-4 px-2 font-bold text-slate-800">{test.name}</td>
                        <td className={`py-4 px-2 text-center font-black text-[14px] ${test.flag === 'H' ? 'text-red-700' : ''}`}>
                          {test.flag && <span className="bg-slate-200 px-1.5 py-0.5 rounded text-[10px] mr-2 align-middle">{test.flag}</span>}
                          {test.result}
                        </td>
                        <td className="py-4 px-2 italic font-sans text-slate-600">{test.unit}</td>
                        <td className="py-4 px-2 text-slate-700 font-sans">{test.ref}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Clinical Remarks Display (New section in preview) */}
                {patient.remarks && (
                  <div className="mb-8 border-t border-black pt-4">
                    <div className="font-sans font-black text-[11px] uppercase tracking-widest text-slate-800 mb-2 border-b border-dotted border-slate-300 pb-1">Peripheral Smear & Observations</div>
                    <div className="text-[12px] text-slate-900 whitespace-pre-wrap leading-relaxed px-2 border-l-4 border-blue-900 ml-1 italic">
                      {patient.remarks}
                    </div>
                  </div>
                )}

                {/* Interpretation Note */}
                <div className="bg-blue-50/50 p-6 border-2 border-blue-200 rounded-lg text-slate-800 italic font-sans text-[11px] leading-relaxed border-dashed">
                  <div className="flex items-center gap-2 mb-2 text-blue-900 not-italic font-black uppercase tracking-wider">
                    <ShieldCheck size={16} />
                    Interpretation & Correlation Note
                  </div>
                  Biological reference intervals are provided for guidance and represent the range of values found in 95% of a healthy population. A result outside this range does not necessarily indicate disease. All laboratory findings must be interpreted by a qualified clinician in the context of clinical history, physical examination, and other investigations.
                </div>
              </div>

              {/* Footer Section */}
              <div className="mt-auto pt-10 flex flex-col gap-8 border-t-2 border-slate-200">
                <div className="flex justify-between items-end px-4">
                  <div className="text-center space-y-1">
                    <div className="font-serif italic text-2xl border-b border-black w-40 pb-1 mx-auto">Dhote</div>
                    <div className="font-black font-sans uppercase text-[11px]">DR. TEJASWINI DHOTE</div>
                    <div className="text-[10px] text-slate-600 uppercase">M.D. Pathology</div>
                  </div>
                  <div className="text-center space-y-1">
                    <div className="font-serif italic text-2xl border-b border-black w-40 pb-1 mx-auto">Yash Shah</div>
                    <div className="font-black font-sans uppercase text-[11px]">Dr. Yash Shah</div>
                    <div className="text-[10px] text-slate-600 uppercase">M.D. Pathology</div>
                  </div>
                  <div className="text-center space-y-1">
                    <div className="font-serif italic text-2xl border-b border-black w-40 pb-1 mx-auto">S. Shah</div>
                    <div className="font-black font-sans uppercase text-[11px]">Dr. Sanjeev Shah</div>
                    <div className="text-[10px] text-slate-600 uppercase">M.D. Path</div>
                  </div>
                </div>

                <div className="flex items-center justify-between font-sans text-[10px] text-slate-400 uppercase font-black tracking-[0.2em] border-t-2 pt-4 border-slate-900">
                  <div className="flex items-center gap-2 text-blue-900">
                    <ShieldCheck size={16} />
                    Electronically Authenticated Report
                  </div>
                  <div className="text-slate-900">Page 1 of 1</div>
                  <div className="flex items-center gap-2 text-slate-900">
                    <Stethoscope size={16} />
                    HMS Digital Cloud v3.0
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0,0,0,0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255,255,255,0.3);
        }
      `}</style>
    </div>
  );
};

export default App;