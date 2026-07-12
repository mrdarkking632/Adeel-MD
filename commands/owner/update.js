module.exports = {
    name: "update",

    async execute(sock, msg) {
        await sock.sendMessage(msg.key.remoteJid, {
            text: "⬆️ Update command ready."
        });
    }
};
