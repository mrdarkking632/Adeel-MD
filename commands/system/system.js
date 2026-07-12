module.exports = {
    name: "system",

    async execute(sock, msg) {
        await sock.sendMessage(msg.key.remoteJid, {
            text: "⚙️ System information ready."
        });
    }
};
