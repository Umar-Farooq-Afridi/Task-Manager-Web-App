const jwt = require("jsonwebtoken");

function authMiddleware(request, response, next) {
  try {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      return response.status(401).json({ message: "Authentication required" });
    }

    const parts = authHeader.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
      return response
        .status(401)
        .json({ message: "Invalid authorization format" });
    }

    const token = parts[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    request.user = decoded;

    next();
  } catch (error) {
    console.error("Authentication Error:", error.message);
    return response.status(401).json({ message: "Invalid or expired token" });
  }
}

module.exports = authMiddleware;
