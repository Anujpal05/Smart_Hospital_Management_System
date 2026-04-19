import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
	token: localStorage.getItem("token") ? localStorage.getItem("token") : null,
	isAuthenticated: false,
	 loading: false,
};	

const authSlice = createSlice({
	name: "auth",
	initialState: initialState,
	reducers:{
		setUser(state , value){
			state.user = value.payload;
		},
		setLoading(state , value){
			state.loading = value.payload;
		},
		setToken(state , value){
			state.token = value.payload;
		},		
		setIsAuthenticated(state , value){
			state.isAuthenticated = value.payload;
		}
	}
});

export const { setUser , setLoading , setToken , setIsAuthenticated} = authSlice.actions;

export default authSlice.reducer;