import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const admin = {
  id: 1,
  user: "admin",
  password: "$2b$10$y3Y57DIRuEX3SAlDWNOoz.50OMTnU9uG7DkfZvOiNPXYHE72MYKiK", // hashed "admin123"
};

export const login = async (req, res) => {
  const { user, password } = req.body;

  try {
    if (user !== admin.user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const isMatch = await bcrypt.compare(password, admin.password); // ✅ async
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign({ id: admin.id, user: admin.user }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
