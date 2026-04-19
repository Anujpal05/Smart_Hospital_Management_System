import { combineReducers} from "@reduxjs/toolkit"
import authReducer from "../slices/authSlice"
import doctorReducer from "../slices/doctorSlice"
import appointmentReducer from "../slices/appointmentSlice"
import patientReducer from "../slices/patientSlice"
const rootReducer = combineReducers({
	// Add your reducers here
	auth: authReducer,
	doctor : doctorReducer,
	appointment : appointmentReducer,
	patient : patientReducer,
});

export default rootReducer;