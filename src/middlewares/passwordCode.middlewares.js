const PasswordCode = require('../models/PasswordCode')
const User = require('../models/User')
const { sendEmail } = require('../utils/sendEmail') 

const passwordCode = async(req, res, next) => {

    const code = require('crypto').randomBytes(64).toString('hex')
    const {id, email,} = req.userPasswordUpdate
    const {frontBaseUrl} = req.body

    const userId = id

    const body = {code, userId} 

    const userCode = await PasswordCode.create(body)
    if(!userCode) return res.sendStatus(400)

    sendEmail({
        to:email,
        subject:'password update verification',
        html: `
        <div style="max-width: 500px; margin: 50px auto; background-color: #f8fafc; padding: 30px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); font-family: 'Arial', sans-serif; color: #fa4959;">
            <h1 style="color: #FF0000; font-size: 28px; text-align: center; margin-bottom: 20px;">Update Verification 🔐</h1>

            <p style="font-size: 18px; line-height: 1.6; margin-bottom: 25px; text-align: center; color:#000000;">This email is because you forgot your password, to update your password please go to the next link:</p>  
            <div style="text-align: center;">
            <a href="${frontBaseUrl}/reset_password/${code}" style="display: inline-block; background-color: #228B22; color: #ffffff; text-align: center; padding: 14px 28px; border-radius: 6px; text-decoration: none; font-weight: bold; font-size: 18px;">Update Password 🔑</a>
            </div>  
        </div> `
    })

    return res.json(code)

    
}

module.exports = passwordCode