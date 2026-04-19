import { API_ENDPOINTS} from "../utils/common/apis"
import { toast } from "react-hot-toast";
import {setAllAppointments , setAppointment ,setLoading} from "../slices/appointmentSlice"
import { apiConnector } from "../utils/common/apiConnector";
export function createAppointmentAction(appointmentData){
	 return async (dispatch) => {
		 const toastId = toast.loading("Creating appointment...");
		try {
			dispatch(setLoading(true));
			const response = await apiConnector("POST",API_ENDPOINTS.CREATEAPPOINTMENT,appointmentData,);
			dispatch(setLoading(false));
			console.log( "create appointment response" ,response);
			if(response.data?.success){
				toast.success("Appointment created successfully!");
				toast.dismiss(toastId);
				return;
			}else{
				toast.error("Failed to create appointment");
				console.log("Create appointment failed:", response.data?.message || "Unknown error");
					toast.dismiss(toastId);
					return;
			}
		} catch (error) {
			console.log("Create appointment error", error);
			toast.error(error.response?.data?.message || "Failed to create appointment");
			toast.dismiss(toastId);
		}
		return;
	 }
}
export function getAllAppointmentsAction(){
	 return async (dispatch) => {
		 const toastId = toast.loading("Fetching appointments...");
		try {
			const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
			// console.log("User from localStorage:", user);
			dispatch(setLoading(true));
			const response = await apiConnector("GET",`${API_ENDPOINTS.GETAPPOINTMENTBYID}${user?._id}`);
			dispatch(setLoading(false));
			console.log( "get all appointments response" ,response);
			if(response.data?.success){
				 dispatch(setAllAppointments(response.data.appointment));
				// toast.success("Appointments fetched successfully!");
				toast.dismiss(toastId);
				return response.data.appointment;
			}else{
				toast.error("Failed to fetch appointments");
				console.log("Fetch appointments failed:", response.data?.message || "Unknown error");
					toast.dismiss(toastId);
					return [];
			}
		} catch (error) {
			console.log("Fetch appointments error", error);
			toast.error(error.response?.data?.message || "Failed to fetch appointments");
			toast.dismiss(toastId);

		}
		return [];
	 }
}