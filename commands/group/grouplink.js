module.exports = {
    name: "grouplink",

    async execute(sock, msg) {
        await sock.sendMessage(msg.key.remoteJid, {
            text: "🔗 Group Link feature ready."
        });
    }
};
