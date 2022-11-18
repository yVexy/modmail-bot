const guildSchema = require('../../../Schemas/guildSchema');
const BaseCommand = require('../../../Structures/BaseCommand')
module.exports = class setCategoryCommand extends BaseCommand {

constructor() {
    super('setcategory', 'utilities', [], false, true)
}

    async run(client, message, args) {
        if (!args[0]) return message.reply("Verifique a usagem do comando, usagem correta: `setcategory <categoryId>`");
        let parent = message.guild.channels.cache.get(args[0]) || await message.guild.channels.fetch(args[0]).catch(e => {
            message.reply("Desculpe, eu não encontrei essa categoria.");
            global.e = e
        });
        if (global.e) return;
        if (!parent) message.reply("Não encontrei nenhuma categoria com esse ID =/");
        if (parent.type != 'GUILD_CATEGORY') return message.reply("O ID especificado vem de um " + parent.type + " e não de um GUILD_CATEGORY")
        try {

            let find = await guildSchema.findOne({ _id: message.guild.id });
            if (!find) {
                let guildModel = new guildSchema({
                    _id: message.guild.id,
                    parentID: parent.id
                })
                await guildModel.save()
            } else {
                await guildSchema.findOneAndUpdate({ _id: message.guild.id }, { parentID: parent.id })

            }



            message.reply(`Categoria salva com sucesso! setado para ${parent}.`)
        } catch (err) {
            console.error(err)
            message.reply("Não foi possível salvar a categoria =/ tente novamente")
        }

    }
}