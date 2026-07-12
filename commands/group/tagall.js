module.exports = {
    name: "tagall",

    async execute(sock, msg) {
        await sock.sendMessage(msg.key.remoteJid, {
            text: "👥 Tag All feature ready."
        });
    }
};
