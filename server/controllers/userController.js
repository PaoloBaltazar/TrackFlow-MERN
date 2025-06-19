import userModel from "../models/userModel.js";

export const getUserData = async (req, res) => {
  try {
    const userId = req.user?.id; // ✅ correctly read from middleware

    const user = await userModel.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.json({
      success: true,
      userData: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        department: user.department,
        isAccountVerified: user.isAccountVerified,
      },
    });
  } catch (error) {
    console.error("getUserData error:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/user/employees
export const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find({}, "name email role department"); // fetch all users with selected fields
    res.status(200).json({ success: true, users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
