module.exports = class BaseCommand {
    /**
     * 
     * @param {String} name 
     * @param {String} category 
     * @param {String[]} aliases 
     * @param {Boolean} dmUsable 
     */
    constructor(name, category, aliases, dmUsable, guildUsable) {
        this.name = name;
        this.category = category;
        this.aliases = aliases;
        this.dmUsable = dmUsable;
        this.guildUsable = guildUsable;

    }
}