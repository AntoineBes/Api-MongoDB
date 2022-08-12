const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        default: false
    },
    email_address: {
        type: String,
        default: false
    },
    password: {
        type: String,
        default: false
    },
    createdAt: {
        type: Date
    },
    updatedAt: {
        type: Date
    },
})
const Users = mongoose.model('users', UserSchema);
module.exports = Users