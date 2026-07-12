module.exports = {
    name: "character",

    async execute(sock, msg) {
        await sock.sendMessage(msg.key.remoteJid, {
            text: "🎭 Character feature ready."
        });
    }
};
