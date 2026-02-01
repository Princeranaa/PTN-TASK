const userModel = require("../Model/Auth.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateAvatar = (firstname, lastname) => {
  const initials = `${firstname[0]}${lastname[0]}`;
  return `https://ui-avatars.com/api/?name=${initials}&background=0D8ABC&color=fff&size=128&rounded=true&bold=true`;
};

exports.register = async (req, res) => {
  try {
    const {
      email,
      fullname: { firstname, lastname },
      password,
      gender,
    } = req.body;

    const isUserExist = await userModel.findOne({ email });

    if (isUserExist) {
      return res.status(400).json({
        message: "User Already Exist",
      });
    }

    const hash = await bcrypt.hash(password, 10);

    const avatar = generateAvatar(firstname, lastname);

    const user = await userModel.create({
      email,
      fullname: { firstname, lastname },
      password: hash,
      avatar,
    });

    const token = jwt.sign(
      { id: user._id, fullname: user.fullname },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    res.status(201).json({
      message: "User Registered Successfully",
      token,
      user: {
        _id: user._id,
        email: user.email,
        fullname: user.fullname,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    console.log("Error in User Registration:", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
      fullname: user.fullname,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" },
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  res.status(200).json({
    message: "User logged in successfully",
    token,
    user: {
      id: user._id,
      email: user.email,
      fullname: user.fullname,
    },
  });
};

exports.profile = async (req, res) => {
  try {
    const user = req.user;

    return res.status(200).json({
      message: "Profile fetched successfully",
      user,
    });
  } catch (error) {
    console.error("Error fetching profile:", error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

exports.logout = async (req, res) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      expires: new Date(0), // expire immediately
    });

    return res
      .status(200)
      .json({ success: true, message: "Logout successful!" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
