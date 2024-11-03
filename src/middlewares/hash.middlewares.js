const bcrypt = require('bcrypt')

const hash = async(req, res, next) => {
    if(!req.body.password) return res.sendStatus(400)
    const {password} = req.body
    const hash = await bcrypt.hash(password, 10)

    req.passwordHash = hash

    next()
}

module.exports = hash