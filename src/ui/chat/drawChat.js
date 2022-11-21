const termkit = require('terminal-kit');
const termkitCoordinates = require('../../utils/ui/coordinates.js');
const drawChannels = require('../channels/drawChannels.js');
const markdownToAnsi = require('../../utils/format/markdownToAnsi.js');

module.exports = async function (channel) {
    // Takes in a Channel object
    // Draws the chat interface to the terminal in its own window using terminal-kit

    // Create the window
    let chatWindow = new termkit.Window({
        parent: global.document,
        x: 61,
        y: 0,
        width: termkitCoordinates.getTerminalWidth() - 61,
        height: termkitCoordinates.getTerminalHeight() - 5,
    });

    let items = [];

    // Fetch recent messages
    let messages = await channel.messages.fetch({ limit: 10 });

    for (let i = 0; i < messages.length; i++) {
        // Convert message to termkit markup
        let message = messages[i];
        let messageContent = markdownToAnsi(message.content);
        let messageAuthor = message.author.username;
        let messageDate = new Date(message.createdTimestamp).toLocaleString();
        items.append({
            content: [
                "^+" + messageAuthor + "^-",
                "^+" + messageDate + "^-",
                messageContent,
            ],
            value: message.id,
            contentHasMarkup: true,
        })
    }


    if (items.length === 0) {
        items.push({
            content: "No messages :(",
            value: "noMessages",
            contentHasMarkup: false,
        });
    }

    // Create the list
    let chatList = new termkit.ColumnMenu({
        parent: chatWindow,
        x: 0,
        y: 0,
        width: termkitCoordinates.getTerminalWidth() - 61,
        height: termkitCoordinates.getTerminalHeight() - 5,
        items: items,
    });


    // Create the input box
    let chatInput = new termkit.InlineInput({
        parent: global.document,
        x: 61,
        y: termkitCoordinates.getTerminalHeight() - 5,
        width: termkitCoordinates.getTerminalWidth() - 61,
        height: 5,
        placeholder: "Type a message...",
    });

    global.chatInput = chatInput;
    global.chatList = chatList;
}