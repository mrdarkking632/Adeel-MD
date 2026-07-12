module.exports = {
    name: "ship",

    async execute(sock, msg) {
        await sock.sendMessage(msg.key.remoteJid, {
            text: "❤️ Ship command ready."
        });
    }
};
