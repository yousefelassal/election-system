const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: String,
    phone: {
        type: String,
        unique: true,
        required: true
    },
    passwordHash: String,
    admin: Boolean,
    voted: Boolean,
    votedFor: String,
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User