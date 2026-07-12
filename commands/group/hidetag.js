module.exports = {
    name: "hidetag",

    async execute(sock, msg) {
        await sock.sendMessage(msg.key.remoteJid, {
            text: "👤 Hidden Tag feature ready."
        });
    }
};
