import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	patient: null,
	 loading: false,
};	

const patientSlice = createSlice({
	name: "patient",
	initialState: initialState,
	reducers:{
		setPatient(state , value){
			state.patient = value.payload;
		},
		setLoading(state , value){
			state.loading = value.payload;
		},
	}
});

export const { setPatient , setLoading} = patientSlice.actions;

export default patientSlice.reducer;