import React from "react";

const Profile = () => {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm max-w-3xl">

      <div className="flex items-center space-x-6">
        {/* Avatar */}
        <div className="w-28 h-28 rounded-full bg-blue-100 flex items-center justify-center text-3xl font-bold text-blue-600">
          DR
        </div>

        {/* Info */}
        <div>
          <h2 className="text-2xl font-semibold">
            Dr. Robert Bill
          </h2>
          <p className="text-gray-500">Cardiologist</p>
          <p className="text-gray-500 mt-1">
            robertbill@email.com
          </p>
          <button className="mt-4 px-5 py-2 bg-blue-600 text-white rounded-lg text-sm">
            Edit Profile
          </button>
        </div>
      </div>

      {/* Divider */}
      <div className="my-8 border-t"></div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-6 text-center">
        <div className="bg-gray-50 p-4 rounded-xl">
          <h3 className="text-xl font-semibold">120</h3>
          <p className="text-gray-500 text-sm">Patients</p>
        </div>

        <div className="bg-gray-50 p-4 rounded-xl">
          <h3 className="text-xl font-semibold">45</h3>
          <p className="text-gray-500 text-sm">Appointments</p>
        </div>

        <div className="bg-gray-50 p-4 rounded-xl">
          <h3 className="text-xl font-semibold">4.8</h3>
          <p className="text-gray-500 text-sm">Rating</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
