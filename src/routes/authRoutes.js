const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

router.post('/register', async (req, res) => {
    const {username, password} = req.body
    const existing = await User.findOne({username})
    if (existing) return res.status(400).json({error: 'User existed'})
    
    const passwordHash = await bcrypt.hash(password, 10)
    const user = new User({username, password: passwordHash})
    await user.save()

    res.json({
        message: 'register completed'
    })
})

router.post('/login', async (req, res) => {
    const {username, password} = req.body
    
    const user = await User.findOne({ username })
    if (!user) return res.status(400).json({ error: 'username not exist'})
    
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch) return res.status(400).json({error: 'password is not correct'})

    const token = jwt.sign({ userId: user._id}, process.env.JWT_SECRET)
    res.json({ token })
})
module.exports = router