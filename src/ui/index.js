// Attaches UI listeners to process
module.exports = function (client) {
    // Attach listeners to process
    global.document.on('key', function (key) {
        if (key === "CTRL_G") {
            global.document.giveFocusTo(global.guildList);
        }
        if (key === "CTRL_H") {
            global.document.giveFocusTo(global.channelList);
        }
        if (key === "CTRL_C") {
            global.terminal.styleReset();
            global.terminal.clear();
            global.terminal.exit();
        }
        if (key === "CTRL_R") {
            global.document.giveFocusTo(global.chatInput);
        }
        if (key === "CTRL_U") {
            global.document.giveFocusTo(global.chatList);
        }
    });
}