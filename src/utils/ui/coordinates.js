// Terminal Kit Utilities

module.exports = {
    // Get the terminal width
    getTerminalWidth: () => {
        return process.stdout.columns;
    },

    // Get the terminal height
    getTerminalHeight: () => {
        return process.stdout.rows;
    },

    // Get terminal half width
    getTerminalHalfWidth: () => {
        return Math.floor(process.stdout.columns / 2);
    },

    // Get terminal half height
    getTerminalHalfHeight: () => {
        return Math.floor(process.stdout.rows / 2);
    },

    // Check if coordinate is within terminal
    isWithinTerminal: (x, y) => {
        return x >= 0 && x < process.stdout.columns && y >= 0 && y < process.stdout.rows;
    },
}