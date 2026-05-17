import React from "react";
import {
  Home,
  ArrowLeft,
  Search,
  Stethoscope,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const NotFoundPage = () => {

  const navigate = useNavigate();

  return (

    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center px-4 py-10 overflow-hidden relative">

      {/* BACKGROUND BLUR */}

      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl"></div>

      <div className="absolute bottom-0 right-0 w-72 h-72 bg-cyan-200/30 rounded-full blur-3xl"></div>

      {/* MAIN CARD */}

      <div className="relative z-10 w-full max-w-3xl bg-white/80 backdrop-blur-xl border border-white shadow-2xl rounded-[2rem] overflow-hidden">

        {/* TOP SECTION */}

        <div className="relative bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-500 px-8 py-14 text-center text-white overflow-hidden">

          {/* DECORATION */}

          <div className="absolute top-[-40px] left-[-40px] w-40 h-40 rounded-full bg-white/10"></div>

          <div className="absolute bottom-[-50px] right-[-50px] w-52 h-52 rounded-full bg-white/10"></div>

          {/* ICON */}

          <div className="mx-auto w-24 h-24 rounded-3xl bg-white/20 backdrop-blur-lg flex items-center justify-center shadow-lg border border-white/20">

            <Stethoscope
              size={44}
              className="text-white"
            />
          </div>

          {/* ERROR CODE */}

          <h1 className="mt-8 text-7xl md:text-8xl font-black tracking-tight">

            404
          </h1>

          <h2 className="mt-4 text-2xl md:text-3xl font-bold">

            Page Not Found
          </h2>

          <p className="mt-4 text-blue-100 max-w-xl mx-auto leading-relaxed text-sm md:text-base">

            The page you are trying to access may have been moved,
            deleted, or does not exist in the Hospital Management System.
          </p>
        </div>

        {/* CONTENT */}

        <div className="px-6 md:px-10 py-8">

          {/* INFO CARDS */}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">

              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">

                <Home
                  size={22}
                  className="text-blue-600"
                />
              </div>

              <h3 className="mt-4 font-bold text-slate-800">

                Home Page
              </h3>

              <p className="mt-2 text-sm text-slate-500 leading-relaxed">

                Return safely to the Home Page.
              </p>
            </div>

            <div className="bg-cyan-50 border border-cyan-100 rounded-2xl p-5">

              <div className="w-12 h-12 rounded-xl bg-cyan-100 flex items-center justify-center">

                <Search
                  size={22}
                  className="text-cyan-600"
                />
              </div>

              <h3 className="mt-4 font-bold text-slate-800">

                Search Pages
              </h3>

              <p className="mt-2 text-sm text-slate-500 leading-relaxed">

                Search patient records, appointments, and reports.
              </p>
            </div>

            <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5">

              <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">

                <Stethoscope
                  size={22}
                  className="text-emerald-600"
                />
              </div>

              <h3 className="mt-4 font-bold text-slate-800">

                HMS Support
              </h3>

              <p className="mt-2 text-sm text-slate-500 leading-relaxed">

                Contact technical support for assistance.
              </p>
            </div>
          </div>

          {/* ACTION BUTTONS */}

          <div className="flex flex-col sm:flex-row gap-4 mt-10">

            <Link
              to="/"
              className="flex-1"
            >

              <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-4 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl">

                <Home size={20} />

                Go To Home Page
              </button>
            </Link>

            <button
              onClick={() =>
                navigate(-1)
              }
              className="flex-1 flex items-center justify-center gap-2 border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-semibold py-4 rounded-2xl transition-all duration-300"
            >

              <ArrowLeft
                size={20}
              />

              Go Back
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;