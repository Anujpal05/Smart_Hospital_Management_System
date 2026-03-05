import React from "react";
import { FaLinkedinIn, FaFacebookF, FaInstagram } from "react-icons/fa";
import News_Section from "../Components/Home/News_Section";
import Contact_Section from "../Components/Home/Contact_Section";

const doctors = [
  {
    id: 1,
    name: "Dr. Michael Johnson",
    specialization: "Neurology",
    image:
      "https://res.cloudinary.com/dcfy1v0ab/image/upload/v1772214254/Rectangle_20_i1gcfr.png",
  },
  {
    id: 2,
    name: "Dr. James Wilson",
    specialization: "Neurology",
    image:
      "https://res.cloudinary.com/dcfy1v0ab/image/upload/v1772214254/Rectangle_20_1_iqcqu9.png",
  },
  {
    id: 3,
    name: "Dr. Sarah Mitchell",
    specialization: "Neurology",
    image:
      "https://res.cloudinary.com/dcfy1v0ab/image/upload/v1772214254/Rectangle_20_2_asahdp.png",
  },
  {
    id: 4,
    name: "Dr. David Brown",
    specialization: "Neurology",
    image:
      "https://res.cloudinary.com/dcfy1v0ab/image/upload/v1772214254/Rectangle_20_i1gcfr.png",
  },
  {
    id: 5,
    name: "Dr. Robert Taylor",
    specialization: "Neurology",
    image:
      "https://res.cloudinary.com/dcfy1v0ab/image/upload/v1772214254/Rectangle_20_1_iqcqu9.png",
  },
  {
    id: 6,
    name: "Dr. Emily Carter",
    specialization: "Neurology",
    image:
      "https://res.cloudinary.com/dcfy1v0ab/image/upload/v1772214254/Rectangle_20_2_asahdp.png",
  },
  {
    id: 7,
    name: "Dr. Olivia Parker",
    specialization: "Neurology",
    image:
      "https://res.cloudinary.com/dcfy1v0ab/image/upload/v1772214254/Rectangle_20_i1gcfr.png",
  },
  {
    id: 8,
    name: "Dr. William Turner",
    specialization: "Neurology",
    image:
      "https://res.cloudinary.com/dcfy1v0ab/image/upload/v1772214254/Rectangle_20_1_iqcqu9.png",
  },
  {
    id: 9,
    name: "Dr. Sophia Anderson",
    specialization: "Neurology",
    image:
      "https://res.cloudinary.com/dcfy1v0ab/image/upload/v1772214254/Rectangle_20_2_asahdp.png",
  },
  {
    id: 10,
    name: "Dr. Benjamin Harris",
    specialization: "Neurology",
    image:
      "https://res.cloudinary.com/dcfy1v0ab/image/upload/v1772214254/Rectangle_20_i1gcfr.png",
  },
  {
    id: 11,
    name: "Dr. Ava Thompson",
    specialization: "Neurology",
    image:
      "https://res.cloudinary.com/dcfy1v0ab/image/upload/v1772214254/Rectangle_20_1_iqcqu9.png",
  },
  {
    id: 12,
    name: "Dr. Daniel Evans",
    specialization: "Neurology",
    image:
      "https://res.cloudinary.com/dcfy1v0ab/image/upload/v1772214254/Rectangle_20_2_asahdp.png",
  },
  {
    id: 13,
    name: "Dr. Grace Roberts",
    specialization: "Neurology",
    image:
      "https://res.cloudinary.com/dcfy1v0ab/image/upload/v1772214254/Rectangle_20_i1gcfr.png",
  },
  {
    id: 14,
    name: "Dr. Matthew Lewis",
    specialization: "Neurology",
    image:
      "https://res.cloudinary.com/dcfy1v0ab/image/upload/v1772214254/Rectangle_20_1_iqcqu9.png",
  },
  {
    id: 15,
    name: "Dr. Chloe Walker",
    specialization: "Neurology",
    image:
      "https://res.cloudinary.com/dcfy1v0ab/image/upload/v1772214254/Rectangle_20_2_asahdp.png",
  },
  {
    id: 16,
    name: "Dr. Ethan Scott",
    specialization: "Neurology",
    image:
      "https://res.cloudinary.com/dcfy1v0ab/image/upload/v1772214254/Rectangle_20_i1gcfr.png",
  },
];

const Doctors = () => {
  return (
    <div className="w-full">

      {/* ===== Hero Section ===== */}
      <div className="relative w-full h-[250px]">
        <img
          src="https://res.cloudinary.com/dcfy1v0ab/image/upload/v1771861269/Blackdoctors_1_zlhzrm.png"
          alt="Doctors Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 text-[#1F2B6C] bg-gray-200/60 flex flex-col justify-center px-6 lg:px-20">
          <p className=" text-sm">Home / Doctors</p>
          <h1 className=" text-4xl font-bold mt-2">
            Our Doctors
          </h1>
        </div>
      </div>

      {/* ===== Doctors Grid ===== */}
      <div className=" py-16 px-6 mx-auto md:px-20">
        <div className="grid mx-auto md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 w-fit">

          {doctors.map((doctor) => (
            <div
              key={doctor.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300"
            >
              {/* Doctor Image */}
              <img
                src={doctor.image}
                alt={doctor.name}
                className="  h-76 lg:h-96 object-cover"
              />

              {/* Info Section */}
              <div className="bg-blue-100 text-center py-6 px-4">
                <h3 className="text-lg font-semibold text-blue-900">
                  {doctor.name}
                </h3>
                <p className="text-sm tracking-widest text-blue-700 mt-1 uppercase">
                  {doctor.specialization}
                </p>

                {/* Social Icons */}
                <div className="flex justify-center gap-4 mt-4 text-blue-900">
                  <FaLinkedinIn className="cursor-pointer hover:text-blue-600" />
                  <FaFacebookF className="cursor-pointer hover:text-blue-600" />
                  <FaInstagram className="cursor-pointer hover:text-blue-600" />
                </div>
              </div>

              {/* Button */}
              <button className="w-full bg-blue-900 text-white py-3 hover:bg-blue-800 transition">
                View Profile
              </button>
            </div>
          ))}

        </div>
      </div>
        
          <div className="relative w-full py-20">
        <img
          src="https://res.cloudinary.com/dcfy1v0ab/image/upload/v1772538319/Rectangle_53_mg8otk.png"
          alt="Doctor Background"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-blue-900/80"></div>

        <div className="relative z-10 max-w-3xl mx-auto text-center text-white px-6">
          <div className="text-5xl font-bold mb-6">“</div>

          <p className="text-lg leading-relaxed">
            The care and attention I received here truly exceeded my
            expectations. The doctors took the time to listen, explain every
            step of the treatment, and made me feel comfortable throughout my
            recovery. I am grateful for their professionalism, kindness, and
            dedication to patient well-being.
          </p>

          <div className="mt-6 font-semibold text-lg">Rahul Mehta</div>

          {/* Dots */}
          <div className="flex justify-center gap-3 mt-6">
            <span className="w-3 h-3 bg-white rounded-full"></span>
            <span className="w-3 h-3 bg-gray-300 rounded-full"></span>
            <span className="w-3 h-3 bg-gray-300 rounded-full"></span>
          </div>
        </div>
      </div>
      <News_Section/>
      <Contact_Section/>
    </div>
  );
};

export default Doctors;