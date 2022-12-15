const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    chatId: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        maxLength: 20
    },
    status: {
        type: String,
        required: false,
        default: 'MAIN',
        trim: true
    },
    lang: {
        type: String,
        default: 'EN',
        required: true
    }
});

module.exports = mongoose.model('User', userSchema);