const bcrypt = require("bcrypt");
const User = require("../models/user");

const registerUser = async (req, res) => {
  const { username, email, password, gender } = req.body;
  try {
    if (!username || !email || !password || !gender) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userExists = await User.findOne({ email }).lean().exec();

    if (userExists) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      gender,
    });

    if (user) {
      res.status(201).json({ message: "User created successfully" });
    } else {
      res.status(400).json({ message: "Invalid user data received" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {
  registerUser,
};
