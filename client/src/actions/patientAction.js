import { API_ENDPOINTS} from "../utils/common/apis"
import { toast } from "react-hot-toast";
import { apiConnector } from "../utils/common/apiConnector";
import { setPatient ,setLoading} from "../slices/patientSlice";
export function createPatientAction(patientData){
	 return async (dispatch) => {
		 const toastId = toast.loading("Creating patient...");
		try {
			const doctor = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
			// console.log("User from localStorage:", user);
			
			const response = await apiConnector("POST",`${API_ENDPOINTS.ADDPATIENT}`,patientData);
			
			console.log( "get all appointments response" ,response);
			if(response.data?.success){
				// toast.success("Appointments fetched successfully!");
				toast.dismiss(toastId);
				return "patient created successfully";
			}else{
				toast.error("Failed to fetch appointments");
				console.log("Fetch appointments failed:", response.data?.message || "Unknown error");
					toast.dismiss(toastId);
					return "Failed to create patient";
			}
		} catch (error) {
			console.log("Fetch appointments error", error);
			toast.error(error.response?.data?.message || "Failed to fetch appointments");
			toast.dismiss(toastId);

		}
		return [];
	 }
}


export function getPatientByUserIdAction(){
	 return async (dispatch) => {
		 const toastId = toast.loading("Fetching patient...");
		try {
			const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
			// console.log("User from localStorage:", user);
			
			const response = await apiConnector("GET",`${API_ENDPOINTS.GETPATIENTBYUSERID}${user._id}`);
			
			console.log( "get patient by user ID response" ,response);
			if(response.data?.success){
				dispatch(setPatient(response.data.data));
				// toast.success("Appointments fetched successfully!");
				toast.dismiss(toastId);
				return "patient fetched successfully";
			}else{
				toast.error("Failed to fetch patient");
				console.log("Fetch patient failed:", response.data?.message || "Unknown error");
					toast.dismiss(toastId);
					return "Failed to fetch patient";
			}
		} catch (error) {
			console.log("Fetch patient error", error);
			toast.error(error.response?.data?.message || "Failed to fetch patient");
			toast.dismiss(toastId);

		}
		return null;
	 }
}

