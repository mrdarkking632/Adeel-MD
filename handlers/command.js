const fs = require("fs");
const path = require("path");

const commands = new Map();

function loadCommands() {

    commands.clear();

    const base = path.join(__dirname, "..", "commands");

    function scanFolder(folder) {

        const items = fs.readdirSync(folder);

        for (const item of items) {

            const fullPath = path.join(folder, item);

            if (fs.statSync(fullPath).isDirectory()) {

                scanFolder(fullPath);

            } else if (item.endsWith(".js")) {

                const command = require(fullPath);

                if (command.name) {
                    commands.set(
                        command.name,
                        command
                    );
                }

            }
        }
    }

    scanFolder(base);

    console.log(`✅ Loaded ${commands.size} commands`);
}

module.exports = {
    loadCommands,
    commands
};
