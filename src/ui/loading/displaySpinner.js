// Display loading spinner on screen using terminal-kit
const termkit = require('terminal-kit');
const termkitCoordinates = require('../../utils/ui/coordinates.js');

module.exports = (message) => {
    // Display the loading spinner
    let spinner = new termkit.AnimatedText({
        parent: global.document,
        animation: [
            "●∙∙",
            "∙●∙",
            "∙∙●",
            "∙∙∙",
            "∙∙∙",
            "∙∙∙",
        ],
        x: termkitCoordinates.getTerminalHalfWidth(),
        y: termkitCoordinates.getTerminalHalfHeight(),
    });

    global.terminal.styleReset();

    // Write the text under the spinner
    let text = new termkit.TextBox({
        parent: global.document,
        x: termkitCoordinates.getTerminalHalfWidth() - (message.length / 2) + 1,
        y: termkitCoordinates.getTerminalHalfHeight() + 1,
        width: message.length,
        height: 1,
    });

    text.appendContent(message);

    global.currentAnimation = spinner;
}