const { readdirSync } = require('fs');


module.exports = (client) => {
    const events = readdirSync('./src/events');
    for (let eventFile of events) {
        const event = require(`../../src/events/${eventFile}`);
        client.on(eventFile.split('.')[0], (...args) => event(client, ...args));

    }



}