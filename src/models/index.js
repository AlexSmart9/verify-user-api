const EmailCode = require("./EmailCode");
const PasswordCode = require("./PasswordCode");
const User = require("./User");

User.hasOne(EmailCode)
EmailCode.belongsTo(User)

User.hasOne(PasswordCode)
PasswordCode.belongsTo(User)