module.exports = {
    name: "autoreact",

    async execute(sock, msg) {
        await sock.sendMessage(msg.key.remoteJid, {
            text: "❤️ Auto React feature ready."
        });
    }
};
