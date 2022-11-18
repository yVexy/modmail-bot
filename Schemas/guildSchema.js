const { model, Schema } = require('mongoose');
module.exports = model('guildModel', new Schema({
    _id: String,
    parentID: String
}))