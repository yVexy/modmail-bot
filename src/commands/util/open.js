const guildSchema = require('../../../Schemas/guildSchema');
const threadSchema = require('../../../Schemas/threadSchema');

const { MessageEmbed } = require('discord.js');
const BaseCommand = require('../../../Structures/BaseCommand');
const { Message } = require('discord.js');

module.exports = class OpenTicketCommand extends BaseCommand {
    constructor() {
        super('open', 'utilities', [], true, false);
    }

    async run(client, message, args) {
        if (!args[0]) return message.reply("Você precisa especificar o ID de alguma guild! usagem correta: `open <guildID>`");

        let mutualGuilds = [];


        for (let guild of client.guilds.cache.values()) {
            let members = await guild.members.fetch();

            let member = members.get(message.author.id);
            if (member)
                mutualGuilds.push(member);
        };
        if (mutualGuilds.length <= 0) return message.reply("Eu não tenho guilds em comum com você!");

        let guild = mutualGuilds[args[0]] ? mutualGuilds[args[0]].guild : null || mutualGuilds.find(a => a.guild.id === args[0]) ? mutualGuilds.find(a => a.guild.id === args[0]).guild : null;
        if (!guild) return message.reply("Não encontrei essa guild =/")
        let findGuild = await guildSchema.findOne({ _id: guild.id });

        if (!findGuild) return message.reply({
            embeds: [
                new MessageEmbed()
                    .setDescription(`A guild **${guild.name}**, não habilitou o sistema de tickets, entre em contato com algum administrador para resolver esse problema.`)
            ]
        })

        let parent = guild.channels.cache.get(findGuild.parentID);
        if (!parent || parent.type != 'GUILD_CATEGORY') return message.reply("A guild que você escolheu, deletou/mudou o tipo da categoria, impedindo o mesmo de criar um novo ticket =/ Entre em contato com algum administrador para resolver o problema");

        let thread = await guild.channels.create(message.author.tag, {
            type: 'GUILD_TEXT',
            parent: parent.id,
            permissionOverwrites: [

                {
                    id: guild.roles.everyone.id,
                    deny: ['VIEW_CHANNEL']
                }
            ]
        });

        await thread.send({
            embeds: [
                new MessageEmbed()
                    .setTitle("Novo ticket.")
                    .setDescription(`**ID do usuário:** ${message.author.id}\n**Usertag:** ${message.author.tag}\n`)
                    .setFooter("Para responder, use --reply <mensagem>")
            ]
        })
        thread.setTopic(message.author.id)
        message.reply({
            embeds: [
                new MessageEmbed()
                    .setDescription(`Obrigado por entrar em contato com **${guild.name}**. Esperamos que em breve, algum staff irá lhe atender.`)
            ]
        })
        let Thread = new threadSchema({
            guildID: findGuild.id,
            threadID: thread.id,
            memberID: message.author.id
        })
        await Thread.save()

    }
}