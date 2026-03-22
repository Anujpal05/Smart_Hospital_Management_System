import Counter from "../models/counter.model.js"

// Used only by backend developer
export const deleteCounter = async (req , res) => {
  try {
    const {name} = req.body;
    const counter = await Counter.deleteMany({name})
    return res.status(200).json(counter)
  } catch (error) {
    return res.status(500).json({message:"Internal server error"})
  }
}


export const getCounter = async (req , res) => {
  try {
    const counter = await Counter.find({})
    return res.status(200).json(counter)
  } catch (error) {
    return res.status(500).json({message:"Internal server error"})
  }
}
