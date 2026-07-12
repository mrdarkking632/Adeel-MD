module.exports = {
    name: "restart",

    async execute(sock, msg) {
        await sock.sendMessage(msg.key.remoteJid, {
            text: "🔄 Restart command ready."
        });
    }
};
