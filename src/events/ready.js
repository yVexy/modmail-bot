const mongoose = require('mongoose')
const { Client } = require('discord.js');
/**
 * @param {Client} client
 */
module.exports = async (client) => {
    client.user.setPresence({ activities: [{ name: 'Send me a DM!', type: 'COMPETING' }] })
    console.log(`📫 | Logged in as ${client.user.tag}`);
    await mongoose.connect(process.env.MONGOURL)
}