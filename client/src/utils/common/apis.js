import React from "react";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5000";

export const API_ENDPOINTS = {
	LOGIN: `${BASE_URL}/api/auth/login`,
	SIGNUP: `${BASE_URL}/api/auth/register`,

	//  *********** APPOINTMENTS API ENDPOINTS **********

	CREATEAPPOINTMENT : `${BASE_URL}/api/appointments/create-appointment`,
	GETAPPOINTMENTS: `${BASE_URL}/api/appointments/`,
	GETPENDINGAPPOINTMENTS: `${BASE_URL}/api/appointments/pending`,
	GETDOCTORAPPOINTMENTS: `${BASE_URL}/api/appointments/doctor-id/`,
	GETPATIENTAPPOINTMENTS: `${BASE_URL}/api/appointments/patient-id/`,
	GETAPPOINTMENTBYID: `${BASE_URL}/api/appointments/`,
	RESPONSEAPPOINTMENT: `${BASE_URL}/api/appointments/`,

	//  *********** PATIENT API ENDPOINTS **********
	GETTOTALPATIENTS: `${BASE_URL}/api/patient/total-patients`,
	ADDPATIENT: `${BASE_URL}/api/patient/add-patient/`,
	GETPATIENTS: `${BASE_URL}/api/patient/`,
	GETPATIENTSBYDOCTORID: `${BASE_URL}/api/patient/doctorid/`,
	GETPATIENTBYID: `${BASE_URL}/api/patient/`,
	GETPATIENTBYUSERID: `${BASE_URL}/api/patient/userid/`,
	UPDATEPATIENT: `${BASE_URL}/api/patient/`,
	DELETEPATIENT: `${BASE_URL}/api/patient/`,
}