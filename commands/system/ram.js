module.exports = {
    name: "ram",

    async execute(sock, msg) {
        await sock.sendMessage(msg.key.remoteJid, {
            text: "💾 RAM information ready."
        });
    }
};
