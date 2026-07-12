module.exports = {
    name: "antilink",

    async execute(sock, msg) {
        await sock.sendMessage(msg.key.remoteJid, {
            text: "🔗 AntiLink feature ready."
        });
    }
};
