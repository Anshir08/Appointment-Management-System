import User from "../models/user.js";
import jwt from "jsonwebtoken";
// middleware for authentication
export const isAuthenticated = (req, res, next) => {
    const token = req.cookies?.authToken;
    if (!token) {
        return res.status(401).json({ message: "User not logged in" });
    }

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(req.user)
        next();
    } catch (e) {
        res.status(401).json({ message: "User not logged in" });
    }
};

export const isGuest = (req, res, next) => {
    const token = req.cookies?.authToken;
    if (token) {
        return res.status(403).json({ message: "Already logged in" });
    }
    next();
};

// middleware for admin authentication
export const isAuthorized = (...roles) => {
    return async (req, res, next) => {
        const user = await User.findById(req.user._id);

        if (user && roles.includes(user.role)) {
            return next();
        }
        res.status(401).json({ message: "Unauthorized" });
    };
};