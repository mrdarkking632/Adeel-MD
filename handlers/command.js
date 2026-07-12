const fs = require("fs");
const path = require("path");

const commands = new Map();

function loadCommands() {
    commands.clear();

    const base = path.join(__dirname, "..", "commands");

    const folders = fs.readdirSync(base);

    for (const folder of folders) {
        const folderPath = path.join(base, folder);

        if (!fs.statSync(folderPath).isDirectory()) continue;

        const files = fs.readdirSync(folderPath);

        for (const file of files) {
            if (!file.endsWith(".js")) continue;

            const command = require(path.join(folderPath, file));

            if (command.name) {
                commands.set(command.name, command);
            }
        }
    }

    console.log(`✅ Loaded ${commands.size} commands`);
}

module.exports = {
    loadCommands,
    commands
};
