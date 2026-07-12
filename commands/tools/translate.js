module.exports = {
    name: "translate",

    async execute(sock, msg) {
        await sock.sendMessage(msg.key.remoteJid, {
            text: "🌐 Translate feature ready."
        });
    }
};
