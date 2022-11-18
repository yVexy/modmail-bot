const BaseCommand = require('../../../Structures/BaseCommand');
const threadSchema = require('../../../Schemas/threadSchema');
const { MessageEmbed } = require('discord.js');

module.exports = class Close extends BaseCommand {
    constructor() {
        super('close', 'utilities', ['fechar'], false, true);

    }
    async run(client, message, args) {
        const findThread = await threadSchema.findOne({ threadID: message.channel.id });

        if (findThread) {
            message.author.send({
                embeds: [
                    new MessageEmbed()
                        .setDescription(`A Thread foi fechada pelos staffs do servidor **${message.guild.name}**`)
                ]
            })
            message.channel.send("Fechando a thread em 10 segundos.");
            threadSchema.findOneAndDelete({ threadID: message.channel.id });

            setTimeout(() => message.channel.delete(), 10000)
        }
    }
}