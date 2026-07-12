module.exports = {
    name: "calculator",

    async execute(sock, msg) {
        await sock.sendMessage(msg.key.remoteJid, {
            text: "🧮 Calculator feature ready."
        });
    }
};
