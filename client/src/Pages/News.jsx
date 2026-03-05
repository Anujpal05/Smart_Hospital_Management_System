import React from "react";
import { CiSearch } from "react-icons/ci";
import { MdOutlineCalendarToday } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { CgHeart } from "react-icons/cg";
import Contact_Section from "../Components/Home/Contact_Section";
import { Link } from "react-router-dom";

const News = () => {
  const blogs = [
    {
      id: 1,
      image:
        "https://res.cloudinary.com/dcfy1v0ab/image/upload/v1772710107/Rectangle_13_2_apxiw7.png",
      title: "Cardiology Care: Keeping Your Heart Healthy",
      desc: "Dr. Emily Carter, a senior cardiologist, explains the importance of regular heart checkups. Early detection of heart conditions through ECG tests and healthy lifestyle habits can significantly reduce the risk of cardiovascular diseases.",
      author: "Dr. Emily Carter",
      specialization: "Cardiologist",
      date: "05 September 2024",
      views: 145,
      likes: 92,
    },
    {
      id: 2,
      image:
        "https://res.cloudinary.com/dcfy1v0ab/image/upload/v1772214253/Rectangle_34_g59mxf.png",
      title: "Neurology: Understanding Brain Health",
      desc: "Dr. Michael Anderson highlights how neurological checkups can help diagnose conditions like migraines, epilepsy, and stroke risks early. Maintaining mental health and brain wellness is essential for a balanced life.",
      author: "Dr. Michael Anderson",
      specialization: "Neurologist",
      date: "12 September 2024",
      views: 121,
      likes: 75,
    },
    {
      id: 3,
      image:
        "https://res.cloudinary.com/dcfy1v0ab/image/upload/v1772710107/Rectangle_13_3_k1pfaf.png",
      title: "Pediatric Care: Protecting Children's Health",
      desc: "Dr. Sophia Martinez shares insights on child healthcare, emphasizing vaccinations, nutrition, and regular pediatric visits to ensure healthy growth and development for children.",
      author: "Dr. Sophia Martinez",
      specialization: "Pediatrician",
      date: "18 September 2024",
      views: 98,
      likes: 64,
    },
    {
      id: 4,
      image:
        "https://res.cloudinary.com/dcfy1v0ab/image/upload/v1772710107/Rectangle_13_4_xf3w7m.png",
      title: "Orthopedic Care: Managing Bone and Joint Health",
      desc: "Dr. Daniel Lee discusses how orthopedic specialists treat bone fractures, arthritis, and joint pain. Regular exercise, posture correction, and early medical attention can help maintain strong bones.",
      author: "Dr. Daniel Lee",
      specialization: "Orthopedic Surgeon",
      date: "25 September 2024",
      views: 167,
      likes: 103,
    },
  ];

  return (
    <div className=" w-full">
      <div className="relative w-full h-[250px]">
        <img
          src="https://res.cloudinary.com/dcfy1v0ab/image/upload/v1772710145/Rectangle_3_2_gblkcg.png"
          alt="Doctors Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 text-[#1F2B6C] bg-gray-200/60 flex flex-col justify-center px-6 lg:px-20">
          <p className=" text-sm">Home / News</p>
          <h1 className=" text-4xl font-bold mt-2">Blog Posts</h1>
        </div>
      </div>
      <div className=" py-16 px-3">
        <div className="max-w-7xl mx-auto lg:px-6 grid lg:grid-cols-3 gap-10">
          {/* BLOG POSTS */}
          <div className="lg:col-span-2 space-y-12 lg:max-h-[100vh] overflow-y-auto">
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className="bg-white shadow rounded-lg p-2 overflow-hidden"
              >
                <img
                  src={blog.image}
                  alt=""
                  className="w-full lg:h-[350px] h-[200px] object-cover"
                />

                <div className="lg:p-6">
                  <div className="flex gap-2 lg:gap-6 text-gray-500 text-sm mb-3">
                    <span className=" flex justify-center items-center gap-2 text-[14px] lg:text-[16px]"><span><MdOutlineCalendarToday /></span> <span>{blog.date}</span></span>
                    <span className=" flex justify-center items-center gap-2 text-[14px] lg:text-[16px]">👤 <span>{blog.author}</span></span>
                    <span className=" flex justify-center items-center gap-2 text-[14px] lg:text-[16px]"><span><FaEye /></span> <span>{blog.views}</span></span>
                    <span className=" flex justify-center items-center gap-2 text-[14px] lg:text-[16px]"><span><CgHeart /></span> <span>{blog.likes}</span></span>
                  </div>

                  <h2 className="text-2xl font-bold text-blue-900 mb-3">
                    {blog.title}
                  </h2>

                  <p className="text-gray-600 mb-5">{blog.desc}</p>

                  <button className="bg-blue-200 cursor-pointer text-blue-900 px-5 py-2 rounded-full hover:bg-blue-300 transition">
                    <Link to="/news-details">Read More →</Link>
                  </button>
                </div>
              </div>
            ))}

            {/* PAGINATION */}
            <div className="flex justify-between items-center text-blue-900 mt-10">
              <span className="cursor-pointer">← Previous Page</span>

              <div className="flex gap-4">
                <span className="font-bold">1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span>5</span>
              </div>

              <span className="cursor-pointer">Next Page →</span>
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
              <h3 className="text-xl font-bold text-blue-900 mb-4">
                Categories
              </h3>

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
      </div>
      <Contact_Section/>
    </div>
  );
};

export default News;
