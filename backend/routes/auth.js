const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const fetchuser= require("../middleware/fetchuser")

//ROUTE 1: Create a User using POST "/api/auth/createuser". No login Required
router.post("/createuser", [
    body('email').isEmail(),
    body('password', "Passkey should be more than 5 character").isLength({ min: 5 }),
    body('name', "Name should have at least more than 3 words").isLength({ min: 3 })
], async (req, res) => {
    // If there are errors return bad request and the errors
    const result = validationResult(req);
    if (!result.isEmpty()) {
        success=false;
        return res.json({success,errors: result.array() });
    }
    // Check wheather the user with this email exists already
    try {
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            success=false;
            return res.status(400).json({ success,error: "Email already exits try with another" })
        }
        const JWT_SSH = "HelloNeerabhaikaiseho"
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        user = await User.create({
            email: req.body.email,
            password: secPass,
            name: req.body.name
        })
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SSH);
        success=true;
        res.json({success,authToken })
        // res.json(user)
    } catch (error) {
        console.log(error)
        res.status(500).json({ Error: "Internal server error occurred" })
    }
})
//ROUTE 2: Create a Login authentication by using POST "/api/auth/createuser".
router.post("/login", [
    body('email').isEmail(),
    body('password', "Passkey should be more than 5 character").exists()
], async (req, res) => {

    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.json({ errors: result.array() });
    }
    const { email, password } = req.body;
    const JWT_SSH = "HelloNeerabhaikaiseho"
    try {
        let user = await User.findOne({ email })
        if (!user) {
            success=false;
            return res.status(400).json({ success,error: "Please try with correct credentials" })
        }
        const comparePassword = await bcrypt.compare(password, user.password)
        if (!comparePassword) {
            success=false;
            return res.status(400).json({ success,error: "Please try with correct credentials" })
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SSH);
        success=true;
        res.json({success, authToken })
    } catch (error) {
        console.log(error)
        res.status(500).json({ Error: "Bhut badi error aa gayi hai bhaii Internal server error" })
    }

})
//ROUTE 3: Verify a User using POST "/api/auth/getuser". login Required
router.post("/getuser",fetchuser, async (req, res) => {
try {
    const userId =req.user.id;
    const user=await User.findById(userId).select("-password")
    res.json(user)
} catch (error) {
    console.log(error)
    res.status(500).json({ Error: "Internal server Error aa gayi hai bhaii" })
}

})
module.exports = router