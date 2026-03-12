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

// --- Mock Data ---
const MOCK_APPOINTMENTS = [
  { id: 1, doctor: "Dr. Sarah Johnson", specialty: "Cardiologist", date: "2023-11-24", time: "10:30 AM", status: "Confirmed", type: "In-Person", location: "Building A, Room 302", reason: "Follow-up on heart rate monitoring", notes: "Please bring your previous reports and avoid caffeine 4 hours before." },
  { id: 2, doctor: "Dr. Michael Chen", specialty: "Dermatologist", date: "2023-12-01", time: "02:15 PM", status: "Pending", type: "Video Call", location: "Online (Zoom)", reason: "Skin rash consultation", notes: "Ensure you are in a well-lit room for the camera." },
  { id: 3, doctor: "Dr. Emma Wilson", specialty: "General Physician", date: "2023-10-15", time: "09:00 AM", status: "Completed", type: "In-Person", location: "Building C, Room 105", reason: "Annual Physical Exam", notes: "All vitals were normal. Recommended vitamin D supplements." },
  { id: 4, doctor: "Dr. Robert Fox", specialty: "Neurologist", date: "2023-09-20", time: "11:00 AM", status: "Canceled", type: "In-Person", location: "Building B, Room 201", reason: "Migraine management", notes: "Patient requested cancellation due to travel." },
];



const DetailModal = ({ appointment, onClose }) => {
  if (!appointment) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h3 className="font-bold text-gray-900 text-lg">Appointment Details</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="flex gap-4">
            <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600">
              <UserCircle size={40} />
            </div>
            <div>
              <h4 className="text-xl font-bold text-gray-900">{appointment.doctor}</h4>
              <p className="text-blue-600 font-medium">{appointment.specialty}</p>
              <span className={`inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                appointment.status === 'Confirmed' ? 'bg-green-100 text-green-700' :
                appointment.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                appointment.status === 'Canceled' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'
              }`}>
                {appointment.status}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Date & Time</p>
              <div className="flex items-center gap-2 text-gray-700">
                <Calendar size={16} className="text-blue-500" />
                <span className="font-semibold">{appointment.date}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <Clock size={16} className="text-blue-500" />
                <span className="font-semibold">{appointment.time}</span>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Mode & Location</p>
              <div className="flex items-center gap-2 text-gray-700">
                {appointment.type === 'Video Call' ? <Video size={16} className="text-blue-500" /> : <MapPin size={16} className="text-blue-500" />}
                <span className="font-semibold">{appointment.type}</span>
              </div>
              <p className="text-sm text-gray-500 truncate pl-6">{appointment.location}</p>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Reason for Visit</p>
            <p className="text-gray-700 bg-gray-50 p-3 rounded-xl text-sm border border-gray-100 leading-relaxed font-medium">
              {appointment.reason}
            </p>
          </div>

          {appointment.notes && (
            <div className="space-y-2">
              <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Physician's Notes</p>
              <div className="flex gap-2 p-3 rounded-xl bg-blue-50/50 border border-blue-100">
                <AlertCircle size={18} className="text-blue-500 shrink-0" />
                <p className="text-blue-800 text-sm italic">{appointment.notes}</p>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 bg-gray-50 flex gap-3">
          <button onClick={onClose} className="flex-1 py-3 text-sm font-bold text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
            Close
          </button>
          {appointment.status !== 'Canceled' && (
            <button className="flex-1 py-3 text-sm font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-100 transition-colors">
              {appointment.type === 'Video Call' ? 'Join Call' : 'Get Directions'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const AppointmentCard = ({ appointment, onViewDetails }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmed': return 'bg-green-100 text-green-700';
      case 'Pending': return 'bg-amber-100 text-amber-700';
      case 'Completed': return 'bg-gray-100 text-gray-700';
      case 'Canceled': return 'bg-red-100 text-red-700';
      default: return 'bg-blue-100 text-blue-700';
    }
  };

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-md transition-all group">
      <div className="flex justify-between items-start mb-4">
        <div className="flex gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
            <UserCircle size={28} />
          </div>
          <div>
            <h4 className="font-bold text-gray-900">{appointment.doctor}</h4>
            <p className="text-sm text-gray-500">{appointment.specialty}</p>
          </div>
        </div>
        <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tight ${getStatusColor(appointment.status)}`}>
          {appointment.status}
        </span>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar size={16} className="text-blue-400" />
          {appointment.date}
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Clock size={16} className="text-blue-400" />
          {appointment.time}
        </div>
      </div>

      <div className="flex gap-2">
        {appointment.status !== 'Completed' && appointment.status !== 'Canceled' ? (
          <button className="flex-1 py-2 text-sm font-semibold border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            Reschedule
          </button>
        ) : (
          <button className="flex-1 py-2 text-sm font-semibold border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            Book Again
          </button>
        )}
        <button 
          onClick={() => onViewDetails(appointment)}
          className="flex-1 py-2 text-sm font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

// --- Main Sections ---

const AppointmentPatient = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const filteredAppointments = useMemo(() => {
    switch (activeTab) {
      case 'upcoming': return MOCK_APPOINTMENTS.filter(a => a.status === 'Confirmed' || a.status === 'Pending');
      case 'past': return MOCK_APPOINTMENTS.filter(a => a.status === 'Completed');
      case 'canceled': return MOCK_APPOINTMENTS.filter(a => a.status === 'Canceled');
      default: return [];
    }
  }, [activeTab]);

  return (
    <div className="animate-in min-h-screen  fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Appointments</h1>
          <p className="text-gray-500">Manage your consultations and visit history</p>
        </div>
        <button className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-semibold flex items-center gap-2 shadow-lg hover:bg-blue-700 transition-all active:scale-95">
          <Plus size={20} /> Book Appointment
        </button>
      </div>

      {/* Appointment Summary Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-600 rounded-3xl p-6 text-white shadow-xl shadow-blue-100">
          <p className="text-blue-100 text-xs font-bold uppercase tracking-widest mb-1">Active</p>
          <h3 className="text-4xl font-bold">2</h3>
          <div className="mt-4 flex items-center gap-2 text-xs bg-white/10 w-fit px-3 py-1.5 rounded-full">
            <Clock size={14} /> Next: Nov 24, 10:30 AM
          </div>
        </div>
        <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Completed</p>
          <h3 className="text-4xl font-bold text-gray-900">12</h3>
          <p className="text-xs text-green-500 mt-4 flex items-center gap-1 font-bold italic">
            <CheckCircle2 size={14} /> Health is looking great!
          </p>
        </div>
        <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Canceled</p>
          <h3 className="text-4xl font-bold text-gray-900">1</h3>
          <button className="text-xs text-blue-600 mt-4 font-bold flex items-center gap-1 hover:underline">
            View Policy <ChevronRight size={14} />
          </button>
        </div>
      </div>

      <div className="mb-8 flex gap-8 border-b border-gray-100">
        {['upcoming', 'past', 'canceled'].map((tab) => (
          <button 
            key={tab} 
            onClick={() => setActiveTab(tab)} 
            className={`pb-4 px-1 font-bold capitalize transition-all relative ${activeTab === tab ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
          >
            {tab}
            {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-full animate-in slide-in-from-left-2" />}
          </button>
        ))}
      </div>

      {filteredAppointments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAppointments.map(apt => (
            <AppointmentCard key={apt.id} appointment={apt} onViewDetails={(a) => setSelectedAppointment(a)} />
          ))}
        </div>
      ) : (
        <div className="py-24 flex flex-col items-center justify-center text-center bg-white border border-dashed border-gray-200 rounded-3xl">
          <div className="w-16 h-16 bg-gray-50 text-gray-300 rounded-full flex items-center justify-center mb-4"><Calendar size={32} /></div>
          <h3 className="text-gray-900 font-bold">No {activeTab} appointments</h3>
          <p className="text-gray-500 text-sm mt-1">Try booking a new consultation today.</p>
        </div>
      )}

      {selectedAppointment && <DetailModal appointment={selectedAppointment} onClose={() => setSelectedAppointment(null)} />}
    </div>
  );
};
export default AppointmentPatient
