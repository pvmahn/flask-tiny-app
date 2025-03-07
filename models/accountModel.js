const mongoose = require('mongoose');

const userAccountSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        unique: true,
    },
    block: {
        type: Boolean,
        default: false,
    },
    resetPassword: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true });

module.exports = mongoose.model('UserAccount', userAccountSchema);