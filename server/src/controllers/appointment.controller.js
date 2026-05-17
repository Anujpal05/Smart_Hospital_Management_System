import Appointment from "../models/appointment.model.js";
import Doctor from "../models/doctor.model.js";
import Patient from "../models/patient.model.js";
import User from "../models/user.model.js";

export const createAppointment = async (req, res) => {
  try {
    const data = req.body;
    console.log(req.user);
    const userId = req.user.id;
    // console.log("Appointment Data:", data);
    const { doctor : doctorName, priority, reason, date, time : timeslot , place } = data;
  // console.log("timeslot :" , timeslot)
    const existPatient = await User.findById({ _id : userId});
    const doctor   = await User.findOne({name : doctorName, role: "DOCTOR" });
    // console.log(doctor);
    if(!doctor){
      return res.status(404).json({ message: "Doctor not found!", success: false });
    }
    // console.log(existPatient)
    if (!existPatient) {
      return res.status(404).json({ message: "Patient not found!",success: false });
    }
    if (!date) {
      return res.status(400).json({ message: "Date is required!",success: false });
    }

    let formattedDate = date;
    if (typeof date === "string" && date.includes("-")) {
      const parts = date.split("-");
      if (parts[0].length === 2) {
        const [day, month, year] = parts;
        formattedDate = new Date(`${year}-${month}-${day}`);
      }
    }

    const payload = {
      doctor: doctor._id,
      priority,
      reason,
      user: userId,
      date: formattedDate,
      timeslot: timeslot,
      place
    };

    const appointment = await Appointment.create(payload);
    return res.status(201).json({ appointment, success: true });
  } catch (error) { 
    console.log("Create Appointment Error:", error);
    return res
      .status(500)
      .json({ message: error.message || "Internal Server Error!", success: false });
  }
};

export const responseAppointment = async (req, res) => {
  try {
    const role = req.user.role;
    const id = req.params.id;
    const { doctorId, patientId, date, status, timeslot } = req.body;
    if (role === "PATIENT") {
      return res.status(403).json({ message: "Access denied!", success: false });
    }

    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found!", success: false });
    }
    
    const appointment = await Appointment.findById(id);
    appointment.patient = patientId;
    appointment.doctor = doctorId;
    appointment.status = status;

    if (date) {
      appointment.date = date;
    }

    if (timeslot) {
      appointment.timeslot = timeslot;
    }

    await appointment.save();
   return res.json({ message: "Appointment accepted successfully!" , success: true});
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "Internal Server Error!", success: false });
  }
};

export const getDoctorAppointments = async (req, res) => {
  try {
    const { id } = req.body;
    const role = req?.user?.role;
    if (role === "PATIENT") {
      return res.status(403).json({ message: "Access denied!" });
    }
    const appointments = await Appointment.find({ doctor: id });

    res.json(appointments);
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "Internal Server Error!" });
  }
};

export const getAppointments = async (req, res) => {
  try {
    const role = req?.user?.role;
    if (role === "PATIENT") {
      return res.status(403).json({ message: "Access denied!" });
    }

    const appointments = await Appointment.find({}).populate("doctor");
    return res.json(appointments);
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "Internal Server Error!" });
  }
};

export const getPendingAppointments = async (req, res) => {
  try {
    const role = req?.user?.role;
    if (role == "PATIENT") {
      return res.status(403).json({ message: "Access denied!" });
    }
    const appointments = await Appointment.find({ status: "PENDING" });
    return res.json(appointments);
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "Internal Server Error!" });
  }
};

export const getAppointmentById = async (req, res) => {
  try {
    const id = req?.params?.id;
    const role = req?.user?.role;
    const userId = req?.user?.id;
    // console.log(id)
    if (role === "PATIENT" && userId !== id) {
      return res.status(403).json({ message: "Access denied!" ,success : false});
    }
    let appointmentdata = [];

    const appointment = await Appointment.find({user : id}).populate({
      path : "doctor",
      select : ""
    }).select("");
    // console.log("Appointment found:", appointment);
    console.log("id : ", appointment[0]);
    if(appointment.length == 0){
      return res.json({success : false , message : "appointments not found"})
    }
    for(let i = 0;i<appointment.length;i++){
      const doctorInfo = await Doctor.findOne({userId : appointment[i].doctor._id.toString()});
      // console.log("doctor info :" , doctorInfo)
      appointmentdata.push({appointmentinfo : appointment[i] ,doctorInfo : doctorInfo});
      // console.log("OBJ : " , obj)
    }
    // console.log(appointment[0].doctor)
    // for(let i = 0 ; i< appointment.length ; i++){
    //   const doctor = await Doctor.findOne({userId : appointment[i].doctor.toString()});
    //   console.log("doctors : ",doctor)
    // }
    // console.log("appointment data : ",appointmentdata)
    return res.json({ message : "Appointment found successfully!" , appointment : appointmentdata , success: true});
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "Internal Server Error!" ,success : false});
  }
};

export const getPatientAppointments = async (req, res) => {
  try {
    const id = req?.params?.id;
    const role = req?.user?.role;
    const userId = req?.user?.id;
    if (role === "PATIENT" && userId !== id) {
      return res.status(403).json({ message: "Access denied!" });
    }

    const appointments = await Appointment.find({ patient: id });
    res.json(appointments);
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "Internal Server Error!" });
  }
};
