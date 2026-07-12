module.exports = {
    name: "weather",

    async execute(sock, msg) {
        await sock.sendMessage(msg.key.remoteJid, {
            text: "🌤️ Weather feature ready."
        });
    }
};
