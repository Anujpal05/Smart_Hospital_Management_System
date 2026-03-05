import React from "react";
import { MdOutlineCalendarToday } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { CgHeart } from "react-icons/cg";
import { CiSearch } from "react-icons/ci";
import Contact_Section from "../Components/Home/Contact_Section";

const NewsDetails = () => {
  return (
    <div className="bg-gray-100">
      {/* HERO SECTION */}
      <div
        className="relative lg:h-[280px] h-[200px] flex items-center"
        style={{
          backgroundImage:
            "url(https://res.cloudinary.com/dcfy1v0ab/image/upload/v1772710107/Rectangle_13_3_k1pfaf.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-white/70"></div>

        <div className="relative max-w-7xl lg:px-20 px-4">
          <p className="text-sm text-blue-900">Home / News / Health</p>

          <h1 className="lg:text-4xl text-2xl font-bold text-blue-900 mt-2">
            A passion for putting patients first.
          </h1>

          <div className="flex gap-6 text-gray-600 mt-3 text-sm font-semibold">
            <span className=" flex justify-center items-center gap-2 text-[14px] lg:text-[16px]">
              <span>
                <MdOutlineCalendarToday />
              </span>{" "}
              <span>Monday, 05 September 2021</span>
            </span>
            <span className=" flex justify-center items-center gap-2 text-[14px] lg:text-[16px]">
              👤 By Author
            </span>
            <span className=" flex justify-center items-center gap-2 text-[14px] lg:text-[16px]">
              <span>
                <FaEye />
              </span>{" "}
              <span>68</span>
            </span>
            <span className=" flex justify-center items-center gap-2 text-[14px] lg:text-[16px]">
              <span>
                <CgHeart />
              </span>{" "}
              <span>186</span>
            </span>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-14 grid lg:grid-cols-3 gap-10">
        {/* BLOG CONTENT */}
        <div className="lg:col-span-2 lg:max-h-[100vh] overflow-y-auto">
          <img
            src="https://res.cloudinary.com/dcfy1v0ab/image/upload/v1772710107/Rectangle_13_2_apxiw7.png"
            className="rounded-lg mb-6"
          />

          <p className="text-gray-600 leading-relaxed mb-5">
            Modern healthcare focuses on providing patient-centered treatment
            that improves quality of life. Hospitals today use advanced
            technologies and experienced doctors to diagnose and treat diseases
            efficiently.
          </p>

          <p className="text-gray-600 leading-relaxed mb-5">
            Preventive healthcare is equally important. Regular checkups,
            balanced nutrition, and physical activity help prevent chronic
            illnesses such as diabetes, heart disease, and hypertension.
          </p>

          <p className="text-gray-600 leading-relaxed mb-10">
            Doctors recommend early diagnosis and timely treatment to improve
            recovery rates. Healthcare professionals continue to innovate and
            improve patient care with modern medical equipment and
            research-based practices.
          </p>

          {/* PAGINATION */}
          <div className="flex justify-between mt-10">
            <button className="bg-blue-200 text-blue-900 px-6 py-2 rounded-full">
              ← Previous Article
            </button>

            <button className="bg-blue-200 text-blue-900 px-6 py-2 rounded-full">
              Next Article →
            </button>
          </div>
        </div>

        {/* SIDEBAR */}
        <div className="space-y-4">
          {/* SEARCH */}
          <div className="p-2 px-4 bg-[#1F2B6C] text-white shadow rounded-md flex flex-between items-center ">
            <input
              type="text"
              placeholder="Search"
              className="w-full rounded-md py-2 outline-none"
            />

            <button className="">
              <CiSearch className="text-2xl " />
            </button>
          </div>
          {/* RECENT POSTS */}
          <div className="bg-white p-5 shadow rounded-lg">
            <h3 className="text-xl font-bold text-blue-900 mb-4">
              Recent Posts
            </h3>

            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="flex gap-3 mb-4">
                <img
                  src="https://res.cloudinary.com/dcfy1v0ab/image/upload/v1772214254/Rectangle_20_2_asahdp.png"
                  alt=""
                  className="w-14 h-14 object-cover rounded"
                />

                <div>
                  <p className="text-md text-blue-400 font-semibold">
                    Monday 05, September 2021
                  </p>
                  <p className="text-sm font-semibold">
                    This Article’s Title goes here, but not too long.
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CATEGORIES */}
          <div className=" bg-white p-5 shadow rounded-lg">
            <h3 className="text-xl font-bold text-blue-900 mb-4">Categories</h3>

            <div className="space-y-3 text-gray-700">
              <div className="flex justify-between">
                <span>Surgery</span>
                <span className="bg-blue-500 text-white px-2 rounded-full flex justify-center items-center text-xs">
                  3
                </span>
              </div>

              <div className="flex justify-between">
                <span>Health Care</span>
                <span className="bg-blue-500 text-white px-2 rounded-full flex justify-center items-center text-xs">
                  5
                </span>
              </div>

              <div className="flex justify-between">
                <span>Medical</span>
                <span className="bg-blue-500 text-white px-2 rounded-full flex justify-center items-center text-xs">
                  8
                </span>
              </div>

              <div className="flex justify-between">
                <span>Professional</span>
                <span className="bg-blue-500 text-white px-2 rounded-full flex justify-center items-center text-xs">
                  10
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Contact_Section/>
    </div>
  );
};

export default NewsDetails;
