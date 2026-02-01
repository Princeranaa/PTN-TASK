const jwt = require("jsonwebtoken");
const User = require("../Model/Auth.model");

exports.userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).send("Please Login!");
    }

    const decodedObj =  jwt.verify(token, process.env.JWT_SECRET);

    const { id } = decodedObj;

    const user = await User.findById(id).select("-password");
    if (!user) {
      throw new Error("User not found");
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
};
