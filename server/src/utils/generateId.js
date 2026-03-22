import Counter from "../models/counter.model.js";

const generateId = async (name, prefix, pad = 4, year = false) => {
  try {
    let counterName = name;
    let yearStr = "";
    if (year) {
      yearStr = new Date().getFullYear();
      const counterName = `${name}-${yearStr}`;
    }

    const counter = await Counter.findOneAndUpdate(
      { name: counterName },
      {
        $inc: { seq: 1 },
      },
      {
        new: true,
        upsert: true,
      },
    );

    const seq = String(counter.seq).padStart(pad, "0");
    return year ? `${prefix}-${yearStr}-${seq}` : `${prefix}-${seq}`;
  } catch (error) {
    return new Error(error.message);
  }
};

export default generateId;
