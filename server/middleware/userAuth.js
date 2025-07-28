import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  const { token } = req.cookies;

  console.log("Auth middleware - Cookies received:", req.cookies);
  console.log("Auth middleware - Token found:", token ? "YES" : "NO");

  if (!token) {
    console.log("Auth middleware - No token found in cookies");
    return res
      .status(401)
      .json({ success: false, message: "Not Authorized. Login Again" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.id && decoded.name) {
      req.user = {
        id: decoded.id,
        name: decoded.name,
        email: decoded.email,
        role: decoded.role,
      };
    } else {
      console.log("Auth middleware - Invalid token structure:", decoded);
      return res.status(401).json({
        success: false,
        message: "Not Authorized. Login Again",
      });
    }

    console.log("Auth middleware - Authentication successful for user:", decoded.name);
    next();
  } catch (error) {
    console.log("Auth middleware - Token verification error:", error.message);
    res.status(401).json({ success: false, message: error.message });
  }
};

export default userAuth;
