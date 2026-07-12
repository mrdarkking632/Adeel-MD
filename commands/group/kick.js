module.exports = {
    name: "kick",

    async execute(sock, msg) {
        await sock.sendMessage(msg.key.remoteJid, {
            text: "🚫 Kick feature ready."
        });
    }
};
