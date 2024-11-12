import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "You're not authorized",
        });
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(401).json({
                success: false,
                message: "Token is invalid",
            });
        }

        req.user = user;
        next();
    });
};

// Middleware to verify if the user is authenticated and matches the user ID or is an admin
// Updated verifyUser middleware
export const verifyUser = (req, res, next) => {
    verifyToken(req, res, () => {
        // Allow the request if user is logged in, or adjust based on role if needed
        if (req.user && (req.user.role === "user" || req.user.role === "admin")) {
            next();
        } else {
            return res.status(401).json({
                success: false,
                message: "You are not authenticated",
            });
        }
    });
};


export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.role === "admin") {
            next();
        } else {
            return res.status(401).json({
                success: false,
                message: "You are not authorized",
            });
        }
    });
};
