const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Users = require("./users-model");
const restrict = require("../middleware/restrict");
const secrets = require('../config/secrets.js')

const router = express.Router();

//get users by find function from users-model and validate with restrict middleware
router.get("/users", restrict("admin"), async (req, res, next) => {
  try {
    res.json(await Users.find());
  } catch (err) {
    next(err);
  }
});

//post user, req body for username and password, set user and find by id with conditions
router.post("/users", async (req, res, next) => {
  try {
    const { username, password, email, role } = req.body;
    const user = await Users.findBy({ username }).first();

    if (user) {
      return res.status(409).json({
        message: "Username is already taken",
      });
    }

    const newUser = await Users.add({
      username,
      // hash the password with a time complexity of "14"
      password: await bcrypt.hash(password, 12),
      email,
      role
    });

    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
});

//post login req body for username and password, and find users from users model the set conditions
 
router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await Users.findBy({ username }).first();

    if (!user) {
      return res.status(401).json({
        message: "Invalid Credentials",
      });
    }

    // hash the password again and see if it matches what we have in the database
    const passwordValid = await bcrypt.compare(password, user.password);

    if (!passwordValid) {
      return res.status(401).json({
        message: "Invalid Credentials",
      });
    }

    function generateToken(user) {
      const payload = {
        subject: user.id, // sub in payload is what the token is about
        username: user.username,
        // ...otherData
      };
    
      const options = {
        expiresIn: '1d', // show other available options in the library's documentation
      };
    
      // extract the secret away so it can be required and used where needed
      return jwt.sign(payload, secrets.jwtSecret, options); // this method is synchronous
    }

    // generate a new JSON web token
    // const token = jwt.sign(
    //   {
    //     userID: user.id,
    //     userRole: "admin", // this value would normally come from the database
    //   },
    //   process.env.JWT_SECRET
    // );

    // // send the token back as a cookie
    // res.cookie("token", token);

    res.json({
      message: `Welcome ${user.username}!`,
    });
  } catch (err) {
    next(err);
  }
});
 

//-----------------------------------------------------------------------------
router.get("/logout", async (req, res, next) => {
  try {
    // this will delete the session in the database and try to expire the cookie,
    // though it's ultimately up to the client if they delete the cookie or not.
    // but it becomes useless to them once the session is deleted server-side.
    req.session.destroy((err) => {
      if (err) {
        next(err);
      } else {
        res.status(204).end();
      }
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
