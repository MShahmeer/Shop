//best practice is to store the token in http not in the local storage because local storage is not safe

const User = require("../models/user");
const ErrorHandler = require("../utils/errorHandler");

//register a user /api/v1/register
exports.registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.create({
      name,
      email,
      password,
      avatar: {
        public_id: "avatar_id_1",
        url: "www.google.com",
      },
    });

    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
