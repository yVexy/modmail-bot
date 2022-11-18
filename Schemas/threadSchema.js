const { model, Schema } = require('mongoose');
module.exports = model('threads', new Schema({
    guildID: String,
    threadID: String,
    memberID: String
}))