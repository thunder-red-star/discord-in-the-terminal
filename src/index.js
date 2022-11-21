// This is a Discord client in the terminal!
require("./utils/logger/ignoreTerminalSpam.js");

const Discord = require('discord.js');
const termkit = require('terminal-kit');
const terminal = termkit.terminal;
const Logger = require("./utils/logger/logger.js")

global.logger = new Logger("logs", "info");
global.document = terminal.createDocument();
global.terminal = terminal;


global.terminal.on('key', function (key) {
    switch (key) {
        case 'CTRL_C' :
            global.terminal.styleReset();
            global.terminal.clear();
            global.terminal.exit();
            break;
    }
});

const loadingSpinner = require("./ui/loading/displaySpinner.js");

const client = new Discord.Client({
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'], intents: new Discord.IntentsBitField(131071)
});

// Load the config file
const config = require('./config/config.json');

// Load everything
require('./event/index.js')(client);

// Attach UI listeners
require('./ui/index.js')(client);

global.client = client;

// Display the loading spinner
loadingSpinner("Loading Discord");

// Login to Discord
client.login(config.token);