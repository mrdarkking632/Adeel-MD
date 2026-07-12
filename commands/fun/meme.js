module.exports = {
    name: "meme",

    async execute(sock, msg) {
        await sock.sendMessage(msg.key.remoteJid, {
            text: "🤣 Meme feature ready."
        });
    }
};
