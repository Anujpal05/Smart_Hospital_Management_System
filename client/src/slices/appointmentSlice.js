import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	appointment : null,
	allAppointments : null,
	 loading: false,
};	

const appointmentSlice = createSlice({
	name: "appointment",
	initialState: initialState,
	reducers:{
		setAppointment(state , value){
			state.appointment = value.payload;
		},
		setAllAppointments(state , value){
			state.allAppointments = value.payload;
		},
		setLoading(state , value){
			state.loading = value.payload;
		},
	}
});

export const { setAppointment , setAllAppointments , setLoading } = appointmentSlice.actions;

export default appointmentSlice.reducer;