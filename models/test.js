const { Schema, model } = require('mongoose')

const test = new Schema({
    name: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    }
})

module.exports = model('Test', test)