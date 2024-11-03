const User = require('../models/User')

const getAllServices = async () => {
    return User.findAll()
}

const createServices = async (user) => {
    return User.create(user)
}

const getOneServices = async (id) => {
    return User.findByPk(id)
}

const removeServices = async (id) => {
    return User.destroy({where: {id}})
}

const updateServices = async (id, user) => {
    return User.update(
        user,
        {where: {id}, returning: true}
    )
}

module.exports = {
    getAllServices,
    createServices,
    getOneServices,
    removeServices,
    updateServices
}