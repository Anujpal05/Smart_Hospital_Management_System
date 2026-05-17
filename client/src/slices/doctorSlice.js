import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
	doctor : null , 
	 loading: false,
};	

const doctorSlice = createSlice({
	name: "doctor",
	initialState: initialState,
	reducers:{
		setUser(state , value){
			state.user = value.payload;
		},
		setLoading(state , value){
			state.loading = value.payload;
		},
		setDoctor(state , value){
			state.doctor = value.payload;
		},
	}
});

export const { setUser , setLoading , setDoctor} = doctorSlice.actions;

export default doctorSlice.reducer;