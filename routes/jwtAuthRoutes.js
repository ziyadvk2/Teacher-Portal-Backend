const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const User = mongoose.model("users");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../middlewares/jwt");
const validateRegisterInput = require("../validation/registerValidator");
const validateLoginInput = require("../validation/loginValidator");
const ensureAuthentication = require("../middlewares/ensureAuthentication");

module.exports = (app) => {
  // Registration endpoint
  app.post("/api/register", async (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);
    const { firstName, lastName, email, password, verifyPassword } = req.body;
    const name = `${firstName} ${lastName}`;

    if (!isValid) {
      if (!firstName) {
        return res.status(400).json({ message: errors.firstName });
      } else if (!lastName) {
        return res.status(400).json({ message: errors.lastName });
      } else if (!email) {
        return res.status(400).json({ message: errors.email });
      } else if (!password) {
        return res.status(400).json({ message: errors.password });
      }else if (!password) {
        return res.status(400).json({ message: errors.verifyPassword });
      } else {
        return res.status(400).json({ message: "Credentials Invalid" });
      }
    }

    if (password !== verifyPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    try {
      const newUser = new User({ name, email, password });
      await newUser.save();
      res.status(201).send("User registered");
    } catch (error) {
      res.status(500).send("Error registering user");
    }
  });

  //login endpoint
  app.post("/api/login", async (req, res, next) => {
    const { errors, isValid } = validateLoginInput(req.body);
    const { email, password } = req.body;


    // Check validation
    if (!isValid) {
      if (!email) {
        return res.status(400).json({ message: errors.email });
      } else if (!password) {
        return res.status(400).json({ message: errors.password });
      } else {
        return res.status(400).json({ message: "Credentials Invalid" });
      }
    }

    const user = await User.findOne({ email });

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const accessToken = generateAccessToken(user);
    const userData = user.toObject ? user.toObject() : user;
    delete userData.password;
    res.json({ accessToken, user: userData });
  });


  // Current_User endpoint
  app.post("/api/current_user", ensureAuthentication, (req, res) => {
    res.json({
      message: "You are authorized to access this route!",
      user: req.user,
    });
  });

  //logout user endpoint
  app.post("/api/logout", ensureAuthentication, async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      user.refreshToken = null;
      await user.save();

      res.json({ success: true });
    } catch (err) {
      res.status(500).json({ error: "Server error" });
    }
  });
};
