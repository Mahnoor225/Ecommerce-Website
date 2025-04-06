import JWT from "jsonwebtoken";
export const requireSignIn = async (req, res, next) => {
    console.log('Request Headers:', req.headers);

    let token = null;

    // 1. Check Authorization header
    if (req.headers?.authorization?.startsWith("Bearer ")) {
        token = req.headers.authorization.split(" ")[1];
        console.log("✅ Token found in Authorization header");
    }

    // 2. Check cookies
    if (!token && req.cookies?.Cookie_token) {
        token = req.cookies.Cookie_token;
        console.log("✅ Token found in cookies");
    }

    // 3. If no token, deny access
    if (!token) {
        console.log("❌ Token not found in headers or cookies");
        return res.status(401).json({ message: "Authorization token is required" });
    }

    // 4. Verify token
    try {
        const decoded = JWT.verify(token, process.env.JWT_Key);
        req.user = decoded;
        req.token = token; // Also attach token if needed later (like in logout)
        console.log("✅ Token successfully verified:", decoded);
        next();
    } catch (error) {
        console.error("❌ JWT Verification Error:", error.message);
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};






