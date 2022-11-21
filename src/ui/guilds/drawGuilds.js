const termkit = require('terminal-kit');
const termkitCoordinates = require('../../utils/ui/coordinates.js');
const drawChannels = require('../channels/drawChannels.js');

module.exports = function (guilds) {
    // Takes in an array of Discord.js Guild objects
    // Draws the guilds to the terminal in its own window using terminal-kit

    // Create the window
    let guildWindow = new termkit.Window({
        parent: global.document,
        x: 0,
        y: 0,
        width: 30,
        height: termkitCoordinates.getTerminalHeight(),
    });

    let items = [];

    for (let i = 0; i < guilds.length; i++) {
        items.push({
            content: guilds[i].name,
            value: guilds[i].id,
            contentHasMarkup: false,
        });
    }

    if (items.length === 0) {
        items.push({
            content: "No guilds :(",
            value: "noGuilds",
            contentHasMarkup: false,
        });
    }

    // Create the list
    let guildList = new termkit.ColumnMenu({
        parent: guildWindow,
        x: 0,
        y: 0,
        width: 30,
        height: termkitCoordinates.getTerminalHeight(),
        items: items,
    });

    global.guildList = guildList;

    guildList.on('submit', function (value) {
        // Draw channels for the selected guild
        let selectedGuild = global.client.guilds.cache.get(value);
        global.selectedGuild = selectedGuild;
        let channels = selectedGuild.channels.cache.toJSON();
        drawChannels(channels);
    });
}