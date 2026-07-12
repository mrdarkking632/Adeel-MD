module.exports = {
    name: "cpu",

    async execute(sock, msg) {
        await sock.sendMessage(msg.key.remoteJid, {
            text: "⚡ CPU information ready."
        });
    }
};
