import jwt from "jsonwebtoken";

export const generateJWToken = async (payload) => {
      return await jwt.sign({ payload }, process.env.JWT_SECRET);
};

export const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorization" });
    }
    await jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(401).json({ message: "Invalid Token!" });
      } else {
        req.user = user.payload;
        next();
      }
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "Internal Server Error" });
  }
};
