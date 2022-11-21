const Discord = require('discord.js');

module.exports = async function raw (client, packet) {
    global.logger.debug(`Event raw triggered`);
    global.logger.debug(`Packet: ${JSON.stringify(packet)}`);
}