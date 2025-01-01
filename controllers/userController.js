const User = require("../model/UserModel");

exports.createAdmin = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existingAdmin = await User.findOne({ username });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const newAdmin = new User({
      username,
      password,
      role: "admin",
    });

    await newAdmin.save();

    res.status(201).json({ message: "Admin created successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.adminLogin = async (req, res) => {
  const { username, password } = req.body;

  if (!username | !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }
  try {
    const checkUserOrNot = await User.findOne({ username });

    if (!checkUserOrNot) {
      return res.status(404).json({ message: "User not found" });
    }

    if (checkUserOrNot.password == password) {
      return res.status(201).json({ message: "You're logged in" });
    } else {
      return res.status(401).json({ message: "Incorrect passowrd" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "server error" });
  }
};
