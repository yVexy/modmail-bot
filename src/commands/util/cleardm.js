const BaseCommand = require('../../../Structures/BaseCommand');

module.exports = class ClearDMCommand extends BaseCommand {
    constructor() {
        super('cleardm', 'utilities', ['limpardm'], true, false)
    }
    async run(client, message, args) {
        if (message.author.id != '846422692953456641') return;
        let dm = await message.author.createDM();
        let msgs = await dm.messages.fetch()
        for (let msg of msgs.values())
            setTimeout(() => msg.author.id === client.user.id ? msg.delete() : '', 100)

    }
}
