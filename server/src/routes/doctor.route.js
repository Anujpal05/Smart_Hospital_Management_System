import express from "express";
import { addDoctor, getDoctorById, getDoctors, updateDoctor } from "../controllers/doctors..controller";
const router = express.Router();

router.post("/add-doctor" , addDoctor);
router.get("/get-doctors" , getDoctors);
router.get("/get-doctor/:id" , getDoctorById);
router.put("/update-doctor/:id" , updateDoctor);

export default router;