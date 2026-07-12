module.exports = {
    name: "server",

    async execute(sock, msg) {
        await sock.sendMessage(msg.key.remoteJid, {
            text: "🖥️ Server information ready."
        });
    }
};
