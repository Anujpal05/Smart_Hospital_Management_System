import React, { useState, useEffect } from "react";
import { 
  Search, 
  X, 
  Stethoscope, 
  Mail, 
  Lock, 
  User, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Activity
} from "lucide-react";
import { useNavigate } from "react-router-dom";



const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate()
  
  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    rememberMe: false
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API Call
    setTimeout(() => {
      setIsLoading(false);
      setShowSuccess(true);
      console.log("Form Data Submitted:", formData);
      setTimeout(() => setShowSuccess(false), 3000);
	  navigate("/patient/dashboard")

      
      // Reset after 3 seconds
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#eef2ff] flex items-center justify-center md:p-8 font-sans">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col md:flex-row min-h-[600px]">
        
        {/* LEFT SIDE - BRANDING & VISUALS */}
        <div className="md:w-5/12 bg-blue-700 p-8 md:p-12 text-white flex flex-col justify-between relative overflow-hidden">
          {/* Abstract background shapes */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full -mr-20 -mt-20 opacity-50 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500 rounded-full -ml-20 -mb-20 opacity-30 blur-3xl"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-12">
              <div className="bg-white p-2 rounded-xl shadow-lg">
                <Stethoscope className="w-8 h-8 text-blue-700" />
              </div>
              <h1 className="text-2xl font-bold tracking-tight">
                MED<span className="text-blue-200">DICAL</span>
              </h1>
            </div>

            <div className="space-y-6">
              <h2 className="text-4xl font-extrabold leading-tight">
                Better Care <br /> 
                <span className="text-blue-200 font-medium">For Better Life.</span>
              </h2>
              <p className="text-blue-100 text-lg leading-relaxed max-w-sm">
                Access your medical records, schedule appointments, and connect with healthcare professionals in one secure place.
              </p>
            </div>
          </div>

          <div className="relative z-10 mt-12 pt-8 border-t border-blue-600/50">
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-blue-700 bg-blue-100 flex items-center justify-center text-blue-700 text-xs font-bold overflow-hidden">
                    <img 
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 10}`} 
                      alt="User avatar" 
                    />
                  </div>
                ))}
              </div>
              <p className="text-sm text-blue-100">
                Join <span className="font-bold text-white">2,000+</span> patients already using our platform.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - FORM */}
        <div className="md:w-7/12 p-8 md:p-16 flex flex-col justify-center bg-white relative">
          
          {/* Success Overlay */}
          {showSuccess && (
            <div className="absolute inset-0 bg-white z-20 flex flex-col items-center justify-center p-8 animate-in fade-in duration-300">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">Success!</h3>
              <p className="text-slate-500 text-center">
                {isLogin ? "Welcome back! Redirecting to your dashboard..." : "Your account has been created successfully."}
              </p>
            </div>
          )}

          <div className="max-w-md mx-auto w-full">
            <header className="mb-10 text-center md:text-left">
              <h2 className="text-3xl font-bold text-slate-800 mb-3">
                {isLogin ? "Welcome Back" : "Start Your Journey"}
              </h2>
              <p className="text-slate-500">
                {isLogin 
                  ? "Enter your credentials to access your dashboard." 
                  : "Join our healthcare community today."}
              </p>
            </header>

            <form onSubmit={handleSubmit} className="space-y-5">
              {!isLogin && (
                <div className="group">
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5 transition-colors group-focus-within:text-blue-600">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      required
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      type="text"
                      placeholder="Dr. John Doe"
                      className="w-full pl-10 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
                    />
                  </div>
                </div>
              )}

              <div className="group">
                <label className="block text-sm font-semibold text-slate-700 mb-1.5 transition-colors group-focus-within:text-blue-600">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                    placeholder="name@medical.com"
                    className="w-full pl-10 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="group">
                <label className="block text-sm font-semibold text-slate-700 mb-1.5 transition-colors group-focus-within:text-blue-600">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    required
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    type="password"
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
                  />
                </div>
              </div>

              {!isLogin && (
                <div className="group">
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5 transition-colors group-focus-within:text-blue-600">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      required
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      type="password"
                      placeholder="••••••••"
                      className="w-full pl-10 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
                    />
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between py-2">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input 
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    type="checkbox" 
                    className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 transition-all" 
                  />
                  <span className="text-sm text-slate-600 group-hover:text-slate-800 transition-colors">
                    Remember me
                  </span>
                </label>
                {isLogin && (
                  <button type="button" className="text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline">
                    Forgot password?
                  </button>
                )}
              </div>

              <button
                disabled={isLoading}
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 transition-all transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <Activity className="w-6 h-6 animate-spin" />
                ) : (
                  <>
                    {isLogin ? "Log In to Account" : "Create My Account"}
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-slate-500">
                {isLogin ? "Don't have an account yet?" : "Already a member?"}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="ml-2 font-bold text-blue-600 hover:text-blue-700 hover:underline focus:outline-none"
                >
                  {isLogin ? "Sign Up Free" : "Log In Here"}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 opacity-40">
        <div className="absolute top-[10%] right-[15%] w-96 h-96 bg-blue-200 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[10%] left-[15%] w-96 h-96 bg-cyan-100 rounded-full blur-[120px]"></div>
      </div>
    </div>
  );
}

export default AuthPage