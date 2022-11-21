const termkit = require('terminal-kit');
const termkitCoordinates = require('../../utils/ui/coordinates.js');

const drawChat = require('../chat/drawChat.js');

module.exports = function (channels) {
    // Takes in an array of Discord.js channel objects
    // Draws the channels to the terminal in its own window using terminal-kit

    // Create the window
    let channelWindow = new termkit.Window({
        parent: global.document,
        x: 31,
        y: 0,
        width: 30,
        height: termkitCoordinates.getTerminalHeight(),
    });

    let items = [];

    for (let i = 0; i < channels.length; i++) {
        let channelName = channels[i].name;
        let attr = {};
        // If text channel, add # to the start
        if (channels[i].type === "text") {
            channelName = "#" + channelName;
        } else if (channels[i].type === "DM") {
            channelName = "DM: " + channelName;
        } else if (channels[i].type === "group") {
            channelName = "Group: " + channelName;
        } else if (channels[i].type === "category") {
            attr = {
                bold: true,
            }
        }
        items.push({
            content: channelName,
            value: channels[i].id,
            contentHasMarkup: false,
            attr: attr,
        });
    }

    if (items.length === 0) {
        items.push({
            content: "No channels :(",
            value: "noChannels",
            contentHasMarkup: false,
        });
    }

    // Create the list
    let channelList = new termkit.ColumnMenu({
        parent: channelWindow,
        x: 0,
        y: 0,
        width: 30,
        height: termkitCoordinates.getTerminalHeight(),
        items: items,
    });

    global.channelList = channelList;

    channelList.on('submit', function (value) {
        // Draw channels for the selected guild
        let selectedChannel = global.client.channels.cache.get(value);
        global.selectedChannel = selectedChannel;
        // Draw messages for the selected channel
        drawChat(selectedChannel);
    });
}