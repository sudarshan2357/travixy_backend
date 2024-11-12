import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// User registration
export const register = async (req, res) => {
  try {
    // Hash the password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
      photo: req.body.photo,
    });

    await newUser.save();

    res.status(200).json({
      success: true,
      message: "Successfully created",
      user: newUser,
    });
  } catch (err) {
    console.error("Error during registration:", err);
    res.status(500).json({
        success: false,
        message: "Failed to create. Try again",
    });
  }
};

// User login
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    // If user doesn't exist
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Compare the password
    const checkCorrectPassword = await bcrypt.compare(password, user.password);

    // If password is incorrect
    if (!checkCorrectPassword) {
      return res.status(401).json({
        success: false,
        message: "Incorrect email or password",
      });
    }

    const { password: hashedPassword, role, ...rest } = user._doc;

    // Create JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "15d" }
    );
    res.cookie("access_token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), 
      sameSite: "lax",  
    })
    .status(200)
    .json({
        success: true,
        token,
        data: { ...rest },
        role,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to login",
    });
  }
};
