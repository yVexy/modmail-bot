const { readdirSync } = require('fs');

module.exports = (client) => {
    const categories = readdirSync('./src/commands');
    for (let category of categories) {
        const commands = readdirSync(`./src/commands/${category}`);
        for (let commandFile of commands) {
            const Command = require(`../../src/commands/${category}/${commandFile}`);
            const command = new Command();

            client.commands.set(command.name, command);
            if (command.aliases) {
                for (let alias of command.aliases)
                    client.commands.set(alias, command)
            }
        }
    }

}