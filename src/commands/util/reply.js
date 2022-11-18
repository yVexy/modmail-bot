const BaseCommand = require('../../../Structures/BaseCommand');
const threadSchema = require('../../../Schemas/threadSchema');
const { MessageEmbed } = require('discord.js');

module.exports = class Reply extends BaseCommand {
    constructor() {
        super('reply', 'utilities', ['fechar'], false, true);

    }
    async run(client, message, args) {
        if (!args[0]) return message.reply("Você não usou o comando corretamente. Usagem correta: `reply <mensagem>`");

        const findThread = await threadSchema.findOne({ threadID: message.channel.id });

        if (!findThread) return message.reply("Este comando não pode ser usado fora de threads!");
        let member = client.users.cache.get(findThread.memberID);
        if (!member) return message.reply("Desculpe, não foi possível encontrar o membro.")
        let msg = message.content.replace('--reply ', '');


        member.send(`**Staff:** ${msg}`)
        message.delete();


        message.channel.send(`**Staff(${message.author.tag}):** ${msg}`);
        let attachments = message.attachments.toJSON();


        for (let attachment of attachments)
            member.send({ content: `Attachment enviado por Staff: ${attachment.url}` })

    }
}