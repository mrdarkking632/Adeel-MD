module.exports = {
    name: "song",

    async execute(sock, msg) {
        await sock.sendMessage(msg.key.remoteJid, {
            text: "🎵 Song feature is under maintenance."
        });
    }
};
