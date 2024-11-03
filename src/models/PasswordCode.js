const { DataTypes} = require('sequelize')
const sequelize = require('../utils/connection')

const PasswordCode = sequelize.define('passwordCode', {
    code: {
        type: DataTypes.TEXT,
        allowNull:false
    }
    //userId
})

module.exports = PasswordCode