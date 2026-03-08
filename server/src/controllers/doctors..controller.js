import Doctor from "../models/doctor.model";


const addDoctor = async (req, res) => {
  try {
    const {userId, specialization , experience , qualification , hospitalName , licenseNumber , consultationFee , availableDays , availableTime} = req.body;

    if(!userId || !specialization || !experience || !qualification || !hospitalName || !licenseNumber || !consultationFee || !availableDays || !availableTime){
      return res.status(400).json({ message: "All fields are required!" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const existingDoctor = await Doctor.findOne({ userId });
    if (existingDoctor) {
      return res.status(400).json({ message: "Doctor already exists" });
    }

    const doctorDetails = {userId , specialization , experience , qualification , hospitalName , licenseNumber , consultationFee , availableDays , availableTime}
    const doctor = await Doctor.create(doctorDetails);

    res.json(doctor);
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || "Internal Server Error!" });
  }
};


const getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({ role: "DOCTOR" });
    res.json(doctors);
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || "Internal Server Error!" });
  }
};

const getDoctorById = async (req, res) => {
  try {
    const doctorId = req.params.id;
    if (!doctorId) {
      return res.status(400).json({ message: "Doctor ID is required!" });
    }

    const doctor = await Doctor.findById(doctorId);
    res.json(doctor);
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || "Internal Server Error!" });
  }
};

const updateDoctor = async (req, res) => {
  try {
    const doctorId = req.params.id;
    if (!doctorId) {
      return res.status(400).json({ message: "Doctor ID is required!"
      });
    }
    const doctor = await Doctor.findByIdAndUpdate(doctorId, req.body,
      { new: true });
        res.json(doctor);
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal Server Error!" });
  }
};


export {addDoctor , getDoctors , getDoctorById , updateDoctor}
