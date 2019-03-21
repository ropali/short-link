const mongoose = require('mongoose')
const Schema = mongoose.Schema;

//Create Schema
const ShortUrlsSchema = new Schema({
    url: {
        type: String,
        required: true
    },
    urlCode: {
        type: String
    },
    userid: {
        type: String
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
})

module.exports = ShortUrls = mongoose.model('ShortUrls', ShortUrlsSchema)