const { commands } = require("./command");

module.exports = {
    handleMessage: async (sock, msg) => {

        if (!msg.message) return;

        const text =
            msg.message.conversation ||
            msg.message.extendedTextMessage?.text ||
            "";

        if (!text.startsWith(".")) return;

        const args = text
            .slice(1)
            .trim()
            .split(/ +/);

        const commandName = args.shift().toLowerCase();

        const command = commands.get(commandName);

        if (!command) return;

        try {
            await command.execute(sock, msg, args);
        } catch (err) {
            console.log("❌ Command Error:", err);
        }
    }
};
