import Payment from "../models/payment.model.js";
import Bill from "../models/bill.model.js";

export const makePayment = async (req, res) => {
  try {
    const { bill, patient, amount, method } = req.body;

    const payload = {
      bill,
      patient,
      amount,
      method,
    };
    const payment = await Payment.create(payload);

    await Bill.findByIdAndUpdate(bill, {
      status: "PAID",
    });

    res.status(201).json({ message: "Payment make successfully!", payment });
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || "Internal Server error!" });
  }
};

export const getPayments = async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate({})
      .populate({
        path: "Patient",
        populate: {
          path: "User",
          select: "name email",
        },
      });
    res.status(200).json(payments);
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || "Internal Server error!" });
  }
};

export const updatePaymentStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { pid } = req.params;
    const payment = await Payment.findOneAndUpdate(
      {
        id: pid,
      },
      { $set: { status } },
    );

    return res.status(200).json({ message: "Payment status updated!" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "Internal Server error!" });
  }
};

export const getPaymentById = async (req, res) => {
  try {
    const { pid } = req.params;
    const payment = await Payment.findById(pid);
    return res.status(200).json(payment);
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "Internal Server error!" });
  }
};
