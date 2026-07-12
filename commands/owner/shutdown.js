module.exports = {
    name: "shutdown",

    async execute(sock, msg) {
        await sock.sendMessage(msg.key.remoteJid, {
            text: "⛔ Shutdown command ready."
        });
    }
};
