
import React from 'react';
import { 
  BsFillMicFill, BsFillCameraVideoFill, BsTelephoneXFill, BsFillVolumeUpFill, BsArrowLeftCircle, BsChevronDown, BsGridFill 
} from 'react-icons/bs';
import { AiFillPlusCircle, AiOutlineSearch, AiOutlineHistory, AiOutlineProfile } from 'react-icons/ai';
import { MdOutlineDashboard } from 'react-icons/md';
import { GiWaves } from 'react-icons/gi';
import { BiPlusCircle, BiLockAlt, BiUserCircle } from 'react-icons/bi';
import { TbTestPipe, TbScan } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';

const Videocall = () => {
	const navigate = useNavigate();
  return (
    // MAIN BROWSER WINDOW WRAPPER
    <div className="bg-gray-100 min-h-screen p-6 font-sans antialiased text-sm">
      <div className="bg-white border border-gray-200 rounded-xl shadow-2xl overflow-hidden">
        

        {/* --- MAIN CONTENT AREA: TWO-COLUMN LAYOUT --- */}
        <div className="grid grid-cols-[1fr,360px] divide-x divide-gray-200">

          {/* === LEFT COLUMN: VIDEO CALL & MAIN CONTROLS === */}
          <div className="p-5 flex flex-col">
            
            {/* Call Header */}
            <div className="flex items-center justify-between mb-5">
              <button onClick={()=> navigate(-1)} className="px-3 py-1.5 border cursor-pointer border-gray-300 rounded-lg text-xs font-medium text-gray-700 flex items-center space-x-1 hover:bg-gray-50">
                <BsArrowLeftCircle size={16}/>
                <span>Call with "Sanath Deo"</span>
              </button>
              <div className="flex items-center space-x-2 text-xs text-gray-700">
                <span className="w-2.5 h-2.5 bg-red-500 rounded-full inline-block animate-pulse"></span>
                <span className="font-mono">00:15:15</span>
              </div>
            </div>

            {/* Main Doctor Video Area (Simulated with image/bg) */}
            <div className="flex-grow relative bg-slate-800 rounded-xl overflow-hidden border border-gray-300 mb-5 aspect-[16/9]">
              <img 
                src="https://images.pexels.com/photos/5732461/pexels-photo-5732461.jpeg" // Replace with your image asset
                alt="Dr. Mark Wood" 
                className="absolute inset-0 w-full h-full object-contain"
              />
              <div className="absolute top-3 left-3 bg-black/50 text-white text-xs px-2 py-0.5 rounded">
                Dr. Martin Deo
              </div>

              {/* Patient Picture-in-Picture */}
              <div className="absolute top-4 right-4 w-40 h-28 bg-gray-900 rounded-lg border-2 border-white shadow-xl overflow-hidden">
                <img 
                    src="https://images.pexels.com/photos/5732461/pexels-photo-5732461.jpeg" // Replace with your image asset
                    alt="Oliver Smith"
                    className="w-full h-full object-contain"
                />
                <div className="absolute bottom-1 right-1 bg-black/50 text-white text-[10px] px-1.5 py-0.5 rounded">
                  Sanath Deo
                </div>
              </div>

              {/* Video Call Interface Controls Overlay */}
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center space-x-3 bg-black/20 p-2 rounded-full border border-white/20">
                <button className="w-10 h-10 rounded-full bg-black/40 text-white flex items-center justify-center border border-white/20 hover:bg-black/60"><BsFillMicFill /></button>
                <button className="w-10 h-10 rounded-full bg-black/40 text-white flex items-center justify-center border border-white/20 hover:bg-black/60"><BsFillCameraVideoFill/></button>
                <button className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center text-xl hover:bg-red-700"><BsTelephoneXFill size={20}/></button>
                <button className="w-10 h-10 rounded-full bg-black/40 text-white flex items-center justify-center border border-white/20 hover:bg-black/60"><AiOutlineProfile /></button>
                <button className="w-10 h-10 rounded-full bg-black/40 text-white flex items-center justify-center border border-white/20 hover:bg-black/60"><AiFillPlusCircle/></button>
              </div>

              {/* Volume Slider (Custom component recommended) */}
              <div className="absolute bottom-20 left-10 flex items-center gap-2 text-white">
                <BsFillVolumeUpFill/>
                <input type="range" className="w-24 accent-blue-600"/>
              </div>
            </div>

            {/* Bottom Question Input */}
            <div className="mt-auto border border-gray-200 rounded-xl p-3 bg-white flex items-center space-x-3">
              <GiWaves className="text-gray-500"/>
              <p className="text-gray-600">Hi, Sanath  how’s your health today? better than yesterday...</p>
            </div>
          </div>

          {/* === RIGHT COLUMN: PATIENT INFORMATION & RECORDS === */}
          <div className="p-5 space-y-5 bg-gray-50 flex flex-col h-full max-h-[calc(100vh-80px)] overflow-y-auto">
            <h2 className="text-lg font-semibold text-gray-800">Patient Information & Records</h2>

            {/* Section 1: Patient Information */}
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-xl font-medium text-gray-600">
                  <BiUserCircle size={24}/>
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900">Sanath Deo</h3>
                  <p className="text-xs text-gray-500">DOB: 12/04/1951 (Age: 72)</p>
                  <p className="text-xs text-gray-500">ID: 987654321</p>
                </div>
              </div>
              <div className="text-sm border-t border-gray-100 pt-3 space-y-1.5">
                <p><strong className="text-gray-800">Gender:</strong> Male</p>
                <p><strong className="text-gray-800">Address:</strong> 123 Care Street, Seattle, WA 98101</p>
                <p><strong className="text-gray-800">Phone:</strong> 206-555-0199</p>
                <p><strong className="text-gray-800">Email:</strong> oliver.s@email.com</p>
              </div>
            </div>

            {/* Section 2: Medical Records (Tabs) */}
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col flex-grow overflow-hidden">
              <div className="flex items-center space-x-1 border-b border-gray-200 mb-4 pb-2">
                {['Diagnostic Images', 'Lab Results', 'Medical History'].map((tab, idx) => (
                  <button key={idx} className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap flex items-center space-x-1 ${idx === 0 ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
                    <span>{tab}</span>
                    <BsChevronDown size={12}/>
                  </button>
                ))}
              </div>
              
              <div className="space-y-3 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-white flex-grow">
                {/* Simulated Records */}
                <RecordItem title="Chest X-ray" type="P-A View" date="01/15/2024" icon={BsGridFill} />
                <RecordItem title="ECG Report" type="12-Lead ECG" date="01/15/2024" icon={TbScan} />
                <RecordItem title="Complete Blood Count (CBC)" type="Lab Panel" date="01/12/2024" icon={TbTestPipe} />
                <RecordItem title="Medical History Summary" type="General" date="Last Updated 01/01/2024" icon={AiOutlineHistory} />
              </div>

              <div className="mt-4 pt-3 border-t border-gray-200 text-xs text-blue-700">
                <p>Click to view full records. New reports are available.</p>
              </div>
            </div>
            
            {/* Bottom Buttons */}
            <div className="grid grid-cols-2 gap-3 mt-auto pt-4 border-t border-gray-200">
                <button className="py-2.5 px-4 bg-gray-100 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-200">
                    Request New Tests
                </button>
                <button className="py-2.5 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700">
                    Upload Documents
                </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

// Sub-component for a single record item
const RecordItem = ({ title, type, date, icon: IconComponent }) => (
  <div className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-100 rounded-lg hover:bg-gray-100 cursor-pointer">
    <div className="w-10 h-10 rounded bg-blue-100 flex items-center justify-center text-blue-600 text-xl">
      <IconComponent />
    </div>
    <div className="flex-grow">
      <h4 className="font-semibold text-gray-900">{title}</h4>
      <p className="text-xs text-gray-600">{type} • {date}</p>
    </div>
    <button className="text-xs text-blue-600 hover:underline">View</button>
  </div>
);

export default Videocall;