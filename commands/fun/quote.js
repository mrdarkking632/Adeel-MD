module.exports = {
    name: "quote",

    async execute(sock, msg) {
        await sock.sendMessage(msg.key.remoteJid, {
            text: "💬 Quote feature ready."
        });
    }
};
