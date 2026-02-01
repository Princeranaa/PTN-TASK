const { body, validationResult } = require("express-validator");

async function validate(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

exports.registerValidation = [
  body("email").isEmail().withMessage("Invalid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("fullname.firstname").notEmpty().withMessage("First name is required"),
  body("fullname.lastname").notEmpty().withMessage("Last name is required"),
  body("gender").notEmpty().withMessage("gender is required"),

  validate,
];

exports.loginValidation = [
  body("email").isEmail().withMessage("Invalid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  validate,
];
