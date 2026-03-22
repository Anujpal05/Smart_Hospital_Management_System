import Bill from "../models/bill.model.js";

// ✅ Create Bill
export const createBill = async (req, res) => {
  try {
    const role = req.user.role;
    if (role !== "DOCTOR" && role !== "ADMIN") {
      return res.status(403).json({ message: "Access denied!" });
    }

    const {
      patient,
      appointment,
      doctor,
      items,
      discount,
      tax,
      paidAmount,
      notes,
    } = req.body;

    const bill = await Bill.create({
      patient,
      appointment,
      doctor,
      items,
      discount,
      tax,
      paidAmount,
      notes,
    });

    res.status(201).json({
      message: "Bill created successfully",
      bill,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || "Internal Server error!" });
  }
};

export const getBills = async (req, res) => {
  try {
    const id = req.user.id;
    const role = req.user.role;
    const { patientId } = req.body;
    if (role == "PATIENT" && patientId != id) {
      return res.status(403).json({ message: "Access denied!" });
    }
    const bills = await Bill.findOne({patient : patientId});
    res.status(200).json(bills);
  } catch (error) {
    res.status(500).json({ message: error.message } || "Internal Server error");
  }
};

export const getBillById = async (req, res) => {
  try {
    const { id } = req.params;
    const bill = await Bill.findById(id);
    res.status(200).json(bill);
  } catch (error) {
    res.status(500).json({ message: error.message } || "Internal Server error");
  }
};
