import { API_ENDPOINTS} from "../utils/common/apis"
import { toast } from "react-hot-toast";
import {setIsAuthenticated,setLoading,setToken,setUser} from "../slices/authSlice"
import { apiConnector } from "../utils/common/apiConnector";
export function signupAction(userData ,navigate){
	 return async (dispatch) => {
		 const toastId = toast.loading("Signing up...");
		try {
			dispatch(setLoading(true));
			const response = await apiConnector("POST",API_ENDPOINTS.SIGNUP,userData);
			dispatch(setLoading(false));
			console.log( "signup response" ,response);
			if(response.data?.success){
				dispatch(setToken(response.data.token));
				dispatch(setUser(response.data.user));
				dispatch(setIsAuthenticated(true));
				localStorage.setItem("token", response.data.token);
				localStorage.setItem("user", JSON.stringify(response.data.user));
				if (response.data.user) {
					 if(response.data.user.role === "PATIENT"){
					   navigate("/patient/dashboard");
					 }else if(response.data.user.role === "DOCTOR"){
					   navigate("/doctor/dashboard");
					 }
				   }
				   toast.success("signup successful!");
				   toast.dismiss(toastId);
				   return;
			}else{
				toast.error("signup failed");
				console.log("signup failed:", response.data?.message || "Unknown error");
					toast.dismiss(toastId);
					return;
			}
		} catch (error) {
			console.log("Signup error", error);
			toast.error(error.response?.data?.message || "Signup failed");
			toast.dismiss(toastId);
		}
		return;
	 }
}
export function loginAction(userData ,navigate){
	 return async (dispatch) => {
		 const toastId = toast.loading("Signing in...");
		try {
			dispatch(setLoading(true));
			const response = await apiConnector("POST",API_ENDPOINTS.LOGIN,userData);
			dispatch(setLoading(false));
			console.log( "login response" ,response);
			if(response.data?.success){
				dispatch(setToken(response.data.token));
				dispatch(setUser(response.data.user));
				dispatch(setIsAuthenticated(true));
				localStorage.setItem("token", response.data.token);
				localStorage.setItem("user", JSON.stringify(response.data.user));
				if (response.data.user) {
					 if(response.data.user.role === "PATIENT"){
					   navigate("/patient/dashboard");
					 }else if(response.data.user.role === "DOCTOR"){
					   navigate("/doctor/dashboard");
					 }
				   }
				   toast.success("Login successful!");
				   toast.dismiss(toastId);
				   return;
			}else{
				toast.error("Login failed");
				console.log("Login failed:", response.data?.message || "Unknown error");
				toast.dismiss(toastId);
				return;
			}
		} catch (error) {
			console.log("Login error", error);
			toast.error(error.response?.data?.message || "Login failed");
			toast.dismiss(toastId);
			return;
		}
	 }
}
