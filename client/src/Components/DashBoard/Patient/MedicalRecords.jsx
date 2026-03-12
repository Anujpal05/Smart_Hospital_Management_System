import React, { useState, useMemo } from 'react';
import { 
  Users, 
  Calendar, 
  BrainCircuit, 
  FileText, 
  Pill, 
  MessageSquare, 
  UserCircle,
  Plus,
  Search,
  Download,
  Eye,
  Clock,
  CheckCircle2,
  Filter,
  MoreVertical,
  ArrowUpRight,
  X,
  MapPin,
  Video,
  AlertCircle,
  FileImage,
  FileBadge,
  Check,
  ChevronRight
} from 'lucide-react';

const MOCK_RECORDS = [
  { id: 1, title: "Annual Blood Work", category: "Lab Results", date: "2023-10-12", doctor: "Dr. Sarah Johnson", size: "1.2 MB", type: "pdf" },
  { id: 2, title: "Chest X-Ray Report", category: "Imaging", date: "2023-09-05", doctor: "Radiology Dept", size: "4.5 MB", type: "image" },
  { id: 3, title: "Post-Surgery Prescription", category: "Prescriptions", date: "2023-08-20", doctor: "Dr. Michael Chen", size: "0.8 MB", type: "pdf" },
  { id: 4, title: "ECG Results", category: "Lab Results", date: "2023-07-15", doctor: "Cardiology Center", size: "2.1 MB", type: "pdf" },
  { id: 5, title: "Brain MRI Scan", category: "Imaging", date: "2023-06-10", doctor: "Neuro-Imaging Inc", size: "12.4 MB", type: "image" },
  { id: 6, title: "Vitamin D Deficiency Plan", category: "Prescriptions", date: "2023-05-22", doctor: "Dr. Emma Wilson", size: "0.5 MB", type: "pdf" },
];



const RecordPreviewModal = ({ record, onClose }) => {
  if (!record) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-300">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-white">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${record.type === 'pdf' ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-blue-500'}`}>
              {record.type === 'pdf' ? <FileText size={20} /> : <FileImage size={20} />}
            </div>
            <div>
              <h3 className="font-bold text-gray-900">{record.title}</h3>
              <p className="text-xs text-gray-500">{record.category} • {record.size}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
             <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-colors">
              <Download size={16} /> Download
            </button>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400">
              <X size={20} />
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-auto bg-gray-100 p-8 flex justify-center items-start">
          {record.type === 'image' ? (
            <div className="bg-white p-4 rounded-xl shadow-lg max-w-2xl w-full">
              <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center relative overflow-hidden group">
                 <img src={`https://images.unsplash.com/photo-1576091160550-2173dad99901?auto=format&fit=crop&w=1000&q=80`} alt="Medical Preview" className="object-cover w-full h-full opacity-90" />
                 <div className="absolute inset-0 flex items-center justify-center bg-black/20"><p className="text-white font-bold bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm">Simulated {record.category} Preview</p></div>
              </div>
            </div>
          ) : (
            <div className="bg-white w-full max-w-3xl shadow-lg rounded-sm min-h-[800px] p-12 border border-gray-200">
              <div className="border-b-2 border-gray-900 pb-6 mb-8 flex justify-between">
                <h1 className="text-2xl font-black uppercase tracking-tighter">Medical Report</h1>
                <p className="font-bold text-sm">HealthSync Hospitals</p>
              </div>
              <div className="grid grid-cols-2 gap-8 mb-8 text-sm">
                <div><p className="text-gray-400 uppercase text-[10px] font-bold">Patient</p><p className="font-bold">John Doe</p></div>
                <div><p className="text-gray-400 uppercase text-[10px] font-bold">Physician</p><p className="font-bold">{record.doctor}</p></div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg text-sm leading-relaxed text-gray-600">The results for {record.title} indicate standard health markers. No immediate intervention required.</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


const MedicalRecordRow = ({ record, onPreview, onDownload }) => (
  <div className="flex items-center justify-between p-4 hover:bg-gray-50 border-b border-gray-50 last:border-0 transition-colors group">
    <div className="flex items-center gap-4 flex-1">
      <div className={`p-3 rounded-xl transition-colors ${record.type === 'pdf' ? 'bg-red-50 text-red-500 group-hover:bg-red-100' : 'bg-blue-50 text-blue-500 group-hover:bg-blue-100'}`}>
        {record.type === 'pdf' ? <FileText size={22} /> : <FileImage size={22} />}
      </div>
      <div>
        <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{record.title}</h4>
        <p className="text-xs text-gray-500">Uploaded on {record.date} • {record.doctor}</p>
      </div>
    </div>
    <div className="hidden md:block flex-1 text-sm text-gray-500">
      <span className="bg-gray-100 px-3 py-1 rounded-full font-medium text-[11px] uppercase">{record.category}</span>
    </div>
    <div className="flex items-center gap-1">
      <button onClick={() => onPreview(record)} className="p-2.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all"><Eye size={20} /></button>
      <button onClick={() => onDownload(record)} className="p-2.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-full transition-all"><Download size={20} /></button>
      <button className="p-2.5 text-gray-400 hover:bg-gray-100 rounded-full"><MoreVertical size={20} /></button>
    </div>
  </div>
);

// --- Main Sections ---



const MedicalRecords = () => {
  const [activeCategory, setActiveCategory] = useState('All Files');
  const [searchTerm, setSearchTerm] = useState("");
  const [previewFile, setPreviewFile] = useState(null);
  const [downloadingId, setDownloadingId] = useState(null);

  const filteredRecords = useMemo(() => {
    return MOCK_RECORDS.filter(record => {
      const matchesCategory = activeCategory === 'All Files' || record.category === activeCategory;
      const matchesSearch = record.title.toLowerCase().includes(searchTerm.toLowerCase()) || record.doctor.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchTerm]);

  const handleDownload = (record) => {
    setDownloadingId(record.id);
    setTimeout(() => setDownloadingId(null), 2000);
  };

  return (
    <div className="animate-in min-h-screen fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div><h1 className="text-2xl font-bold text-gray-900">Medical Records</h1><p className="text-gray-500">Secure access to health documents</p></div>
        {/* <div className="flex gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input type="text" placeholder="Search..." className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all shadow-sm" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
          <button className="bg-white border border-gray-200 p-2.5 rounded-xl text-gray-600 hover:bg-gray-50 shadow-sm"><Filter size={20} /></button>
        </div> */}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { id: 'All Files', icon: FileBadge, count: MOCK_RECORDS.length },
          { id: 'Lab Results', icon: FileText, count: MOCK_RECORDS.filter(r => r.category === 'Lab Results').length },
          { id: 'Prescriptions', icon: Pill, count: MOCK_RECORDS.filter(r => r.category === 'Prescriptions').length },
          { id: 'Imaging', icon: FileImage, count: MOCK_RECORDS.filter(r => r.category === 'Imaging').length }
        ].map((cat) => (
          <button key={cat.id} onClick={() => setActiveCategory(cat.id)} className={`p-4 rounded-2xl border transition-all flex flex-col items-start gap-3 group text-left ${activeCategory === cat.id ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-white border-gray-100 text-gray-900 hover:border-blue-200'}`}>
            <div className={`p-2 rounded-lg ${activeCategory === cat.id ? 'bg-white/20' : 'bg-blue-50 text-blue-600 group-hover:bg-blue-100'}`}><cat.icon size={20} /></div>
            <div><p className="font-bold text-sm">{cat.id}</p><p className={`text-xs ${activeCategory === cat.id ? 'text-blue-100' : 'text-gray-400'}`}>{cat.count} files</p></div>
          </button>
        ))}
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
        <div className="p-5 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center"><h3 className="font-bold text-gray-900">{activeCategory}</h3></div>
        <div className="divide-y divide-gray-100">{filteredRecords.map(record => (<MedicalRecordRow key={record.id} record={record} onPreview={setPreviewFile} onDownload={handleDownload} />))}</div>
      </div>

      {downloadingId && (
        <div className="fixed bottom-8 right-8 bg-gray-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 animate-in slide-in-from-bottom-10 z-[200]">
           <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center"><Check size={18} className="text-white" /></div>
           <div><p className="font-bold text-sm">Download Started</p><p className="text-xs text-gray-400">Fetching document...</p></div>
        </div>
      )}

      {previewFile && <RecordPreviewModal record={previewFile} onClose={() => setPreviewFile(null)} />}
    </div>
  );
};


export default MedicalRecords