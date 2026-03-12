 import React from 'react'
 
 
 
 export const InputField = ({ label, value, onChange, placeholder, type = "text", fullWidth = false }) => (
    <div className={`grid grid-cols-1 sm:grid-cols-3 gap-2 items-center mb-4 ${fullWidth ? 'col-span-full' : ''}`}>
      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider sm:text-right sm:pr-6 whitespace-nowrap overflow-hidden text-ellipsis">
        {label}
      </label>
      <div className="sm:col-span-2">
        <input 
          type={type}
          value={value} 
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-md focus:ring-1 focus:ring-blue-500 focus:bg-white outline-none transition-all text-slate-700 placeholder:text-slate-300"
        />
      </div>
    </div>
  );
  export  const TextAreaField = ({ label, value, onChange }) => (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-6">
      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 sm:text-right sm:pr-6 pt-3">
        {label}
      </label>
      <div className="sm:col-span-2">
        <textarea
          value={value} 
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px] text-sm font-medium text-slate-700"
        />
      </div>
    </div>
  );
  export const SectionHeader = ({ icon: Icon, title, subtitle }) => (
    <div className="flex items-center gap-4 mb-10 border-b border-slate-100 pb-6">
      <div className="bg-blue-600 p-3 rounded-2xl text-white shadow-sm shrink-0">
        <Icon size={24} />
      </div>
      <div>
        {/* <h2 className="text-xl font-black text-slate-800 tracking-tight uppercase">{title}</h2> */}
        <h2 className="text-xl font-bold tracking-tight text-slate-800 mb-0.5">{title}</h2>
        <p className="text-sm text-slate-500 font-medium">{subtitle}</p>
      </div>
    </div>
  );