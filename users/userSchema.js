const mongoose = require('mongoose');

const userSchema  = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    hobbies: {
        type: String,
        required: true,
    }
});

const users = new mongoose.model('users', userSchema);

module.exports = users;