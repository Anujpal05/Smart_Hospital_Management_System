import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { confirmMail, sendVerificationMail } from "../utils/mail.js";


// Get All Users (Admin)
export const getAllUsers = async (req, res) => {
  try {
    const role = req.user.role;
    if (role == "PATIENT") {
      return res.status(403).json({ message: "Access denied!" });
    }

    const users = await User.find().select("-password");

    if (!users) return res.status(404).json({ message: "No users found!" });

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Single User by ID
export const getUserById = async (req, res) => {
  try {
    const role = req.user.role;
    const id = req.user.id;
    const userId = req.params?.id;

    if (role == "PATIENT" && id != userId) {
      return res.status(403).json({ message: "Access denied!" });
    }

    if (!userId) {
      return res.status(400).json({ message: "User ID is required!" });
    }

    const user = await User.findById(userId).select("-password");

    if (!user) return res.status(404).json({ message: "User not found!" });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Users By Role (Doctor / Patient / Admin)
export const getUsersByRole = async (req, res) => {
  try {
    const { role } = req.body;
    const userRole = req.user.role;
    if (userRole == "PATIENT") {
      return res.status(403).json({ message: "Access denied!" });
    }
    const users = await User.find({ role }).select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update User Profile
export const updateUser = async (req, res) => {
  try {
    const id = req.user.id;
    const userId = req.params?.id;
    const {name} = req.body;
    if (id != userId) {
      return res.status(403).json({ message: "Access denied!" });
    }

    const updatedUser = await User.findByIdAndUpdate(userId, {name}, {
      new: true,
    }).select("-password");

    if (!updatedUser)
      return res.status(404).json({ message: "User not found!" });

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Password
export const updatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const id = req.user.id;
    const userId = req.params?.id;

    if (id != userId) {
      return res.status(403).json({ message: "Access denied!" });
    }
    if (!oldPassword || !newPassword) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    if (newPassword.length < 5) {
      return res
        .status(400)
        .json({ message: "Password must be at least 5 characters long!" });
    }

    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: "User not found!" });

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Old password incorrect!" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Soft Delete User (Deactivate Account)
export const deactivateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true },
    ).select("-password!");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User deactivated", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Reactivate User (Admin Only)
export const activateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isActive: true },
      { new: true },
    ).select("-password!");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User activated", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const sendVerificationLink = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    if(user.isVerified){
      return res.status(400).json({ message: "User already verified!" });
    }

    const token = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    user.verificationToken = hashedToken;
    user.tokenExpiry = Date.now() + 10 * 60 * 1000;
    await user.save();

    const verifyLink = `${process.env.BASE_URL}/api/user/verify?token=${token}`;
    await sendVerificationMail(user.name, user.email, verifyLink);
    return res
      .status(200)
      .json({ message: "Verification email sent to your email address!" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "Internal Server Error!" });
  }
};

export const verifyMail = async (req, res) => {
  try {
    const token = req.query.token;

    const hashToken  = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      verificationToken: hashToken,
      tokenExpiry : {$gt: Date.now()}
    })
    

    if(!user){
      return res.status(400).json({ message: "Email verification failed!" });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.tokenExpiry = undefined;
    await user.save();
    await confirmMail(user.email);
    return res.status(200).json({ message: "Email verified successfully!" });
  } catch (error) {
    return res.status(500).json({ message: error.message || "Internal Server Error!" });
  }
}
