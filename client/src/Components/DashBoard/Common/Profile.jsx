import {
  FiCamera,
  FiSearch,
  FiMail,
  FiLock,
  FiUserPlus,
} from "react-icons/fi";
import React from "react";

import { BsThreeDots } from "react-icons/bs";
import { MdVerified } from "react-icons/md";
import ProfileSettings from "./ProfileSettings";
import NotificationSettings from "./NotificationSettings";

const Profile = () => {
  return (
    <div className=" rounded-2xl min-h-screen">

      {/* PAGE HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Settings</h1>
        <p className="text-gray-500 text-sm">
          Personalize your account and manage preferences securely.
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-3 gap-6">

        {/* PROFILE SETTINGS */}
        <ProfileSettings />

        {/* NOTIFICATION SETTINGS */}
       <NotificationSettings/>

        {/* ACCOUNT SECURITY */}
        <div className="bg-white rounded-2xl p-6 shadow-md">

          <h2 className="font-semibold mb-4">Account & Security</h2>

          <div className="space-y-4">

            <div className="flex justify-between items-center">
              <span>Password</span>
              <button className="border px-3 py-1 rounded-md text-sm flex items-center gap-2">
                <FiLock />
                Change Password
              </button>
            </div>

            <div className="flex justify-between items-center">
              <span>Manage Logged Devices</span>
              <button className="text-blue-500 text-sm">
                View all active logins
              </button>
            </div>

            <div className="flex justify-between items-center">
              <span>Two-Factor Authentication</span>
              {/* <div className="w-10 h-5 bg-gray-300 rounded-full"></div> */}
              <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked={false} />

                  <div className="w-10 h-5 bg-gray-300 rounded-full peer 
                      peer-checked:bg-blue-500 
                      after:content-[''] after:absolute after:top-[2px] after:left-[2px]
                      after:bg-white  after:rounded-full after:h-4 after:w-4 
                      after:transition-all 
                      peer-checked:after:translate-x-5">
                  </div>
                </label>
            </div>

            <div className="flex justify-between items-center">
              <span>Login Alerts</span>
              <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked={false} />

                  <div className="w-10 h-5 bg-gray-300 rounded-full peer 
                      peer-checked:bg-blue-500 
                      after:content-[''] after:absolute after:top-[2px] after:left-[2px]
                      after:bg-white  after:rounded-full after:h-4 after:w-4 
                      after:transition-all 
                      peer-checked:after:translate-x-5">
                  </div>
                </label>
            </div>

          </div>
        </div>

        {/* DATA PRIVACY */}
        <div className="col-span-2 bg-white rounded-2xl p-6 shadow-md">

          <h2 className="font-semibold mb-4">Data & Privacy</h2>

          <div className="space-y-4">

            {[
              { name: "Zaza Gonzales", role: "Assistant" },
              { name: "Grace White", role: "Nurse" },
              { name: "Freddy Ulric", role: "Nurse" },
            ].map((user, i) => (
              <div
                key={i}
                className="flex justify-between items-center"
              >
                <div>
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.role}</p>
                </div>

                <div className="flex items-center gap-3">

                  <select className="border rounded-md text-sm px-2 py-1">
                    <option>Full Access</option>
                    <option>View Only</option>
                  </select>

                  <BsThreeDots />
                </div>
              </div>
            ))}

            <button className="flex items-center gap-2 text-blue-500 text-sm">
              <FiUserPlus />
              Add Member
            </button>

          </div>

        </div>

      </div>

      {/* FOOTER BUTTONS */}
      <div className="flex justify-end gap-4 mt-6">
        <button className="px-4 py-2 border rounded-lg">
          Cancel
        </button>

        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">
          Save Changes
        </button>
      </div>

    </div>
  );
}

export default Profile;












// old profile version 
// import React from "react";

// const Profile = () => {
//   return (
//     <div className="bg-white p-8 rounded-2xl shadow-sm max-w-3xl">

//       <div className="flex items-center space-x-6">
//         {/* Avatar */}
//         <div className="w-28 h-28 rounded-full bg-blue-100 flex items-center justify-center text-3xl font-bold text-blue-600">
//           DR
//         </div>

//         {/* Info */}
//         <div>
//           <h2 className="text-2xl font-semibold">
//             Dr. Robert Bill
//           </h2>
//           <p className="text-gray-500">Cardiologist</p>
//           <p className="text-gray-500 mt-1">
//             robertbill@email.com
//           </p>
//           <button className="mt-4 px-5 py-2 bg-blue-600 text-white rounded-lg text-sm">
//             Edit Profile
//           </button>
//         </div>
//       </div>

//       {/* Divider */}
//       <div className="my-8 border-t"></div>

//       {/* Stats */}
//       <div className="grid grid-cols-3 gap-6 text-center">
//         <div className="bg-gray-50 p-4 rounded-xl">
//           <h3 className="text-xl font-semibold">120</h3>
//           <p className="text-gray-500 text-sm">Patients</p>
//         </div>

//         <div className="bg-gray-50 p-4 rounded-xl">
//           <h3 className="text-xl font-semibold">45</h3>
//           <p className="text-gray-500 text-sm">Appointments</p>
//         </div>

//         <div className="bg-gray-50 p-4 rounded-xl">
//           <h3 className="text-xl font-semibold">4.8</h3>
//           <p className="text-gray-500 text-sm">Rating</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;
