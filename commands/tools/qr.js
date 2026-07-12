module.exports = {
    name: "qr",

    async execute(sock, msg) {
        await sock.sendMessage(msg.key.remoteJid, {
            text: "📱 QR feature ready."
        });
    }
};
