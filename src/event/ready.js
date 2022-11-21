const Discord = require('discord.js');

const drawGuilds = require('../ui/guilds/drawGuilds.js');
const drawChannels = require('../ui/channels/drawChannels.js');
const UIKeybinds = require('../ui/index.js');

module.exports = async function ready (client) {
    global.currentAnimation.animate(false);
    global.terminal.clear();

    // Draw the UI
    drawGuilds(client.guilds.cache.toJSON());

    // Draw DM channels
    drawChannels(client.channels.cache.filter(channel => channel.type === "DM").toJSON());

    // Add keybinds
    UIKeybinds();
}