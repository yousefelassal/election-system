const mongoose = require('mongoose')

const candidateSchema = new mongoose.Schema({
    name: String,
    votes: {
        type: Number,
        default: 0
    },
    party: String,
    image: String,
})

candidateSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Candidate = mongoose.model('Candidate', candidateSchema)

module.exports = Candidate