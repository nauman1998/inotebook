const express = require('express')
const User = require('../models/User')
const router = express.Router()
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser')

const JWT_SECRET = "NaumanK@y"

//ROUTE 1:create a User using: POST "/api/auth/createuser" .Doesnt require auth
router.post('/createuser', [
  body('email', 'enter valid email').isEmail(),
  body('name', 'Enter Name of length greater > 3').isLength({ min: 3 }),
  body('password', 'Password must be atleat 5 characters').isLength({ min: 5 }),
]
  , async (req, res) => {
    let success=false;
    // Handling errors related above email name password types and length  return bad request 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success,errors: errors.array() });
    }

    // Check whether emails exists
    try {
      let user = await User.findOne({ email: req.body.email })

      if (user) {
         success=false;
        return res.status(400).json({ success,error: 'Sorry a user with this email already exists' })
      }
      // encrypt password and add salt with it additional secure layer added
      const salt = await bcrypt.genSalt(10)
      const secPass = await bcrypt.hash(req.body.password, salt)
      // create new user
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      })

      //   .then(user => res.json(user))
      //   .catch(err=>{console.log(err)
      // res.json({message:err.message})})
      const data = {
        user: {
          id: user.id
        }
      }
      // this is a token pass provided to user for next time login by using this token along with cresentials
      const authtoken = jwt.sign(data, JWT_SECRET)
      success=true
      res.json({success, authtoken })
      // res.json(user)
    }
    catch (error) {
      console.error(error.message)
      res.status(500).send('Internal server error occured')
    }


  })
//ROUTE 2: Authenticate user: POST "/api/auth/login" .Doesnt require login
router.post('/login', [
  body('email', 'enter valid email').isEmail(),
  body('password', 'Password can not be blank').exists(),
]
  , async (req, res) => {
    let success=false;
    // Handling errors related above email name password types and length  return bad request 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body
    try {

      let user = await User.findOne({ email })
      if (!user) {
        success=false
        return res.status(400).json({success, error: "Please try to login with correct credentials  " })
      }
      const passwordcompare = await bcrypt.compare(password, user.password)
      if (!passwordcompare) {
        success=false
        return res.status(400).json({ success,error: "Please try to login with correct credentials  " })
      }
      const data = {
        user: {
          id: user.id,
          email: user.email
        }
      }
      // this is a token pass provided to user for next time login by using this token along with cresentials
      const authtoken = jwt.sign(data, JWT_SECRET)
      success=true
      res.json({success, authtoken ,  user: {
        email: user.email  // Include the email or other details as needed
      }})
    }

    catch (error) {
      console.error(error.message)
      res.status(500).send('Internal server error occured')
    }
  })

//ROUTE 3: Get logedin User Details using: POST "/api/auth/getuser" . require login

router.post('/getuser',fetchuser, async (req, res) => {
  try {
    userId = req.user.id

    const user = await User.findById(userId).select("-password")
    res.send(user)


  } catch (error) {
    console.error(error.message)
    res.status(500).send('Internal server error occured')
  }

})
module.exports = router