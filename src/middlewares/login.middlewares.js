const bcrypt = require('bcrypt')
const User = require('../models/User')

const loginMiddlewares = async(req, res, next) => {
    const {email, password} = req.body

    const user = await User.findOne({where: {email}})
    if(!user) return res.status(401).json({error: 'Invalid Credentials'})

    const isValid = await bcrypt.compare(password, user.password)
    if(!isValid) return res.status(401).json({error: 'Invalid Credentials'})

    req.userlogged = user

    next()
}

module.exports = loginMiddlewares