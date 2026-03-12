import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import React from "react";
export default function NotificationSettings(){

  const [slots,setSlots] = useState([
    {from:"22:00",to:"07:00"}
  ])

  const addSlot = ()=>{
    setSlots([...slots,{from:"00:00",to:"00:00"}])
  }

  return(
    <div className="bg-white rounded-2xl p-6  shadow-md">

      <h2 className="font-semibold mb-4">Notification Settings</h2>

      <div className="space-y-4">

        {/* CHANNEL */}
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm">Notification Channels</p>
            <p className="text-xs text-gray-400">Email & SMS</p>
          </div>

          <Switch defaultChecked/>
        </div>

        {/* ITEMS */}
        {["Appointments","Consultation","Test Result","Login Alerts"].map((item,i)=>(
          <div key={i} className="flex justify-between items-center">
            <span className="text-sm">{item}</span>
            <Switch/>
          </div>
        ))}

        {/* DO NOT DISTURB */}
        <div className="border-t pt-4">

          <div className="flex justify-between items-center mb-2">
            <div>
              <p className="text-sm">Do Not Disturb</p>
              <p className="text-xs text-gray-400">
                Mute notifications during set hours
              </p>
            </div>

            <Switch defaultChecked/>
          </div>

          {slots.map((slot,index)=>(
            <div key={index} className="flex gap-2 mb-2">

              <div className="flex items-center gap-1">
                <span className="text-xs text-gray-500">From</span>
                <input type="time" className="input w-32" defaultValue={slot.from}/>
              </div>

              <div className="flex items-center gap-1">
                <span className="text-xs text-gray-500">To</span>
                <input type="time" className="input w-32" defaultValue={slot.to}/>
              </div>

            </div>
          ))}

          <button
            onClick={addSlot}
            className="flex items-center gap-1 text-blue-500 text-sm mt-2"
          >
            <FiPlus/>
            Add time slot
          </button>

        </div>

      </div>

    </div>
  )
}

function Switch({defaultChecked=false}){

  return(
    <label className="relative inline-flex items-center cursor-pointer">
      <input type="checkbox" defaultChecked={defaultChecked} className="sr-only peer"/>

      <div className="w-10 h-5 bg-gray-300 rounded-full peer
          peer-checked:bg-blue-500
          after:content-[''] after:absolute after:top-[2px] after:left-[2px]
          after:bg-white after:rounded-full after:h-4 after:w-4
          after:transition-all
          peer-checked:after:translate-x-5">
      </div>
    </label>
  )
}