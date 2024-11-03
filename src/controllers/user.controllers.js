
const EmailCode = require('../models/EmailCode')
const PasswordCode = require('../models/PasswordCode')
const User = require('../models/User')
const { getAllServices, createServices, getOneServices, removeServices, updateServices } = require('../services/user.services')
const catchError = require('../utils/catchError')

const getAll = catchError(async(req, res) => {
    const results = await getAllServices()
    return res.status(200).json(results)
})

const create = catchError(async(req, res, next) => {
    const result = await createServices({...req.body, password: req.passwordHash})
    req.result = result
    next()
    
})

const getOne = catchError(async(req, res) => {
    const {id} = req.params
    const result = await getOneServices(id)
    if (!result) return res.sendStatus(404)
    return res.status(200).json(result)
})

const remove = catchError(async(req, res) => {
    const {id} = req.params

    const result = await removeServices(id)
    if (!result) return res.sendStatus(404)

    return res.sendStats(204)
})

const update = catchError(async(req, res) => {
    const {id} = req.params

    const fieldToDelete = ['password', 'email', 'isVerified']

    fieldToDelete.forEach(field => {
        delete req.body[field]
    })

    const result = await updateServices(id, req.body)
    if(result[0] === 0) return res.sendStatus(404)

    return res.json(result[1][0])
})

const login = catchError(async(req, res) => {
    const user = req.userlogged
    const token = req.token
    return res.json({user, token})
})

const logged = catchError(async(req, res) => {
    const user = req.user
    return res.json(user)
})

const userVerified = catchError(async(req, res) => {
    const {code} = req.params

    const result = await EmailCode.findOne({where:{code}})
    const user= await User.findByPk(result.userId)
    if(!user) return res.sendStats(404)

    const userUpdate = await user.update({isVerified: true})
    await result.destroy()

    return res.json(userUpdate)
})

const updatePasswordRequest = catchError(async(req, res, next) => {
    const {email} = req.body
    const userToUpdate = await User.findOne({where: { email }})

    req.userPasswordUpdate = userToUpdate

    next()

})

const updatePassword = catchError(async(req, res) => {
    const {code} = req.params

    const result = await PasswordCode.findOne({where: {code}})

    if(!code) return res.sendStatus(404).json("code not found")
    const id = await User.findByPk(result.userId)
    if(!id) return res.sendStatus(404)
    

    const fieldToDelete = ['email', 'firstName', 'lastName','country','image','isVerified']
    fieldToDelete.forEach(field => {
        delete req.body[field]
    })

    const passwordUpdate = await id.update( {password: req.passwordHash})

    await result.destroy()
    
    return res.json(passwordUpdate);
    
})


module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    login,
    logged,
    userVerified,
    updatePasswordRequest,
    updatePassword
}