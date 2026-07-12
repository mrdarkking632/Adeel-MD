module.exports = {
    name: "status",

    async execute(sock, msg) {
        await sock.sendMessage(msg.key.remoteJid, {
            text: "📢 Status feature ready."
        });
    }
};
