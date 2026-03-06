import { useState } from "react";
import React from "react";

export default function AuthPage() {
	const [isLogin, setIsLogin] = useState(true);

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-100 p-4">
			<div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden grid md:grid-cols-2">

				{/* LEFT SIDE - IMAGE / BRANDING */}
				<div className=" md:flex flex-col justify-center items-center bg-blue-900 text-white p-10">
					<div className='  flex justify-between items-center font-semibold px-4 py-4 text-gray-200 bg-blue-900 relative'>
									<h1 className="text-xl font-bold text-blue-300">MED<span className=' text-white'>DICAL</span></h1>
									<div className=' flex items-center gap-6'>
										<button className=" text-2xl text-white outline-none">
										{/* <FaSearch /> */}
									</button>
									</div>
								</div>
					<p className="text-lg text-center opacity-90">
						Your Health, Our Priority.
						Secure access to your medical dashboard.
					</p>
				</div>

				{/* RIGHT SIDE - FORM */}
				<div className="p-8 md:p-12">
					<h2 className="text-3xl font-bold text-gray-800 mb-2">
						{isLogin ? "Welcome Back 👋" : "Create Account 🏥"}
					</h2>
					<p className="text-gray-500 mb-8">
						{isLogin
							? "Login to access your account"
							: "Sign up to get started"}
					</p>

					<form className="space-y-5">
						{!isLogin && (
							<div>
								<label className="block text-sm font-medium text-gray-600 mb-1">
									Full Name
								</label>
								<input
									type="text"
									placeholder="John Doe"
									className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none"
								/>
							</div>
						)}

						<div>
							<label className="block text-sm font-medium text-gray-600 mb-1">
								Email
							</label>
							<input
								type="email"
								placeholder="example@email.com"
								className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none"
							/>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-600 mb-1">
								Password
							</label>
							<input
								type="password"
								placeholder="••••••••"
								className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none"
							/>
						</div>

						{!isLogin && (
							<div>
								<label className="block text-sm font-medium text-gray-600 mb-1">
									Confirm Password
								</label>
								<input
									type="password"
									placeholder="••••••••"
									className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none"
								/>
							</div>
						)}

						{isLogin && (
							<div className="flex justify-between text-sm">
								<label className="flex items-center gap-2 text-gray-600">
									<input type="checkbox" className="accent-cyan-600" />
									Remember me
								</label>
								<button
									type="button"
									className="text-cyan-600 hover:underline"
								>
									Forgot password?
								</button>
							</div>
						)}

						<button
							type="submit"
							className="w-full bg-blue-700 hover:bg-cyan-700 text-white py-3 rounded-lg font-semibold transition duration-300"
						>
							{isLogin ? "Login" : "Sign Up"}
						</button>
					</form>

					<p className="mt-6 text-center text-sm text-gray-600">
						{isLogin ? "Don't have an account?" : "Already have an account?"}
						<button
						    
							onClick={() => setIsLogin(!isLogin)}
							className="ml-1 cursor-pointer text-cyan-600 font-semibold hover:underline"
						>
							{isLogin ? "Sign Up" : "Login"}
						</button>
					</p>
				</div>
			</div>
		</div>
	);
}