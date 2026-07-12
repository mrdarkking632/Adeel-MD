module.exports = {
    name: "private",

    async execute(sock, msg) {
        await sock.sendMessage(msg.key.remoteJid, {
            text: "🔒 Bot mode: Private"
        });
    }
};
