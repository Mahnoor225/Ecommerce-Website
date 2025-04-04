// import JWT from 'jsonwebtoken'
// import express from 'express'

// export const requireSignIn = async (req, res, next) =>{
//     try {
//             JWT.verify(req.headers.authorization, process.env.JWT_Key)
//             // req.user = decode
//             next()
//     } catch (error) 
//     {
//          console.log(JWT ,'error')   
//     }
// }

// Middleware/requireSignIn.js
import JWT from 'jsonwebtoken';

export const requireSignIn = async (req, res, next) => {
    // Log all headers to check if the Authorization header is present
    console.log('Request Headers:', req.headers);

    // Extract the token from the Authorization header
    const token = req.headers.authorization?.split(' ')[1];  // Split by 'Bearer ' and get the token part

    if (!token) {
        return res.status(401).json({ message: "Authorization token is required" });
    }

    try {
        // Verify the token
        const decoded = JWT.verify(token, process.env.JWT_Key);
        req.user = decoded;
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};

