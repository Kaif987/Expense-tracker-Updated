const User = require("../models/userModel")
const jwt = require("jsonwebtoken")

const loginUser = async (req, res) => {
    const {email, password} = req.body
    try {
      const user = await User.login(email, password)
      const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)
      res.status(200).json({token})
    }

    catch (error) {
      res.status(400).json({error: error.message})
    }
}

const registerUser = async (req, res) => {
  const {email, password} = req.body
  
  try {
    const user = await User.register(email, password)
    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)
    res.status(200).json({token})
  }

  catch (error) {
    res.status(400).json({error: error.message})
  }
}

module.exports = { loginUser, registerUser}

