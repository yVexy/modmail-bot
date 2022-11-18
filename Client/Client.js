const { Client, Collection } = require('discord.js');
const { config } = require('dotenv');
const { readdirSync } = require('fs');
config()

module.exports = class extends Client {
    constructor() {
        super({
            intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_MEMBERS', 'DIRECT_MESSAGES', ''],
            partials: ['CHANNEL', 'GUILD_MEMBER']
        })
        this.commands = new Collection();
        this.threads = new Collection();
    }
    run() {
        const handlers = readdirSync('./Client/handlers');
        for (let handlerFile of handlers) {
            const handler = require(`./handlers/${handlerFile}`);
            handler(this)
        }


        this.login(process.env.TOKEN)
    }
}