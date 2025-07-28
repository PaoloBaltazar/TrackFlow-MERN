import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  // Check for token in cookies first, then in Authorization header
  let token = req.cookies.token;

  if (!token) {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.substring(7);
    }
  }

  console.log("Auth middleware - Cookies received:", req.cookies);
  console.log(
    "Auth middleware - Authorization header:",
    req.headers.authorization
  );
  console.log("Auth middleware - Token found:", token ? "YES" : "NO");

  if (!token) {
    console.log("Auth middleware - No token found in cookies or headers");
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

    console.log(
      "Auth middleware - Authentication successful for user:",
      decoded.name
    );
    next();
  } catch (error) {
    console.log("Auth middleware - Token verification error:", error.message);
    res.status(401).json({ success: false, message: error.message });
  }
};

export default userAuth;
