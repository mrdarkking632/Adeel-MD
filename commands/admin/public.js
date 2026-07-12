module.exports = {
    name: "public",

    async execute(sock, msg) {
        await sock.sendMessage(msg.key.remoteJid, {
            text: "🌍 Bot mode: Public"
        });
    }
};
