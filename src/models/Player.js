const mongoose = require('mongoose')

const PlayerSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    level: {
        type: Number,
        required: true
    },
    playedCount: {
        type: Number,
        default: 0
    },
    teammates: [{
        type: String
    }],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

module.exports = mongoose.model('Players', PlayerSchema)