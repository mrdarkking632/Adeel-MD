module.exports = {
    name: "anticall",

    async execute(sock, msg) {
        await sock.sendMessage(msg.key.remoteJid, {
            text: "📵 Anti Call feature ready."
        });
    }
};
