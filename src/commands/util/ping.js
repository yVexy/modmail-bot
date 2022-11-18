const BaseCommand = require('../../../Structures/BaseCommand');
const { MessageEmbed } = require('discord.js');

module.exports = class PingCommand extends BaseCommand {
    constructor() {
        super('ping', 'utilities', [], true, true);

    }

    run(client, message, args) {

        message.reply({
            embeds: [
                new MessageEmbed()
                    .setTitle('Pong!')
                    .setDescription(`**❤️‍🔥 | Latência da API:** \`${client.ws.ping}ms\``)
                    .setColor('RANDOM')
            ]
        })
    }
}