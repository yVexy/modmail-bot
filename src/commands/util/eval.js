const BaseCommand = require('../../../Structures/BaseCommand');
const { inspect } = require('util');
const { MessageEmbed } = require('discord.js');
const { appendFileSync, unlinkSync } = require('fs');
module.exports = class EvalCommand extends BaseCommand {
    constructor() {
        super('eval', 'utilities', ['evaluate'], false, true)
    }

    async run(client, message, args) {
        if (message.author.id != '846422692953456641') return;
        if (!args[0]) return message.reply("Você não utilizou o comando corretamente. Usagem correta: `eval <code>`");
        let evaluate = message.content.replace('--eval ', '');
        let sendJSFile = (io, msg, content) => {    
            appendFileSync('./evaluate.js', content.toString());
            msg.reply({ files: ['./evaluate.js'] })
            setTimeout(() => unlinkSync('./evaluate.js'), 100);

            return `${io} é maior ou igual á 1024 caracteres, por isso, foi enviado um arquivo JS.`
        }
        try {
            global.exit = inspect(await eval(evaluate));
            if (evaluate.length >= 1024) {

                evaluate = 'A entrada é maior ou igual á 1024 caracteres.'
            };

            const msgEmbed = new MessageEmbed()
                .setTitle('Eval')
                .addField('Entrada', `\`\`\`js\n${evaluate}\`\`\``)
                .addField('Saída', `\`\`\`js\n${global.exit.length >= 1024 ? sendJSFile('A saída', message, global.exit) : global.exit}\`\`\``)
                .setColor('GREEN');
            message.reply({ embeds: [msgEmbed] })
        } catch (err) {
            const msgEmbed = new MessageEmbed()
                .setTitle('Eval')
                .addField('Entrada', `\`\`\`js\n${evaluate}\`\`\``)
                .addField('Saída', `\`\`\`js\n${inspect(err).length >= 1024 ? sendJSFile('A saída', message, inspect(err)) : inspect(err)}\`\`\``)
                .setColor('RED');
            message.reply({ embeds: [msgEmbed] })
        }
    }
}