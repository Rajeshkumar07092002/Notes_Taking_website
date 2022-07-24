const express = require('express');
const User = require("../models/Users");
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/fetchUser');

const JWT_SECRET = "Rajeshisgoodboy@samjhe"

// ROUTE 1: Create a user using:POST "/api/auth/createUser".No login required
router.post('/createUser',
   [body('email', 'Enter a valid email').isEmail(),
   body('password', 'password must be of 5 length').isLength({ min: 5 }),
   body('name', 'name must be of 3 length').isLength({ min: 3 })
   ],
   async (req, res) => {
      let success=false;
      //If there are errors return bad request and error
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(400).json({ success,errors: errors.array() });
      }
      //check whether user with same email exist already
      try {
         let user = await User.findOne({ email: req.body.email });
         if (user) {
            return res.status(400).json({success, error: "Sorry user with this email already exist" });
         }
         const salt = bcrypt.genSaltSync(10);
         const secPass = await bcrypt.hashSync(req.body.password, salt);
         //create a new user
         user = await User.create({
            email: req.body.email,
            name: req.body.name,
            password: secPass,
         });
         const data = {
            user: {
               id: user.id
            }
         }
         const authtoken = jwt.sign(data, JWT_SECRET);
         //   console.log(authtoken);
         // res.json(user)
         success=true;
         res.json({success, authtoken })

      } catch (error) {
         console.log(error.message);
         res.status(500).send("internal server error");
      }
   })

//ROUTE 2:Authenticate a user using:POST "/api/auth/login".No login required

router.post('/login',
   [body('email', 'Enter a valid email').isEmail(),
   body('password', 'password cannot be blank').exists(),
   ],
   async (req, res) => {
      let success=false;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = req.body;
      try {
         let user = await User.findOne({ email });
         if (!user) {
            success=false;
            return res.status(400).json({success, error: "Please enter correct credentials" });
         }
         const passwordCompare = await bcrypt.compareSync(password, user.password);
         if (!passwordCompare) {
            success = false
            return res.status(400).json({ success, error: "Please enter correct credentials" });
         }
         const data = {
            user: {
               id: user.id
            }
         }
         const authtoken = jwt.sign(data, JWT_SECRET);
         success = true;
         res.json({ success, authtoken })

      } catch (error) {
         console.log(error.message);
         res.status(500).send("internal server error");
      }
   }
)

//ROUTE 3:Get logged in  userDetails using:POST "/api/auth/getuser".login required
router.post('/getuser', fetchUser, async (req, res) => {
   try {
      const userId = req.user.id;
      const user = await User.findById(userId).select("-password");
      res.send(user);
   } catch (error) {
      console.log(error.message);
      res.status(500).send("internal server error");
   }
})

module.exports = router