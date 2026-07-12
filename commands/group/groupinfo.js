module.exports = {
    name: "groupinfo",

    async execute(sock, msg) {
        await sock.sendMessage(msg.key.remoteJid, {
            text: "👥 Group Info feature ready."
        });
    }
};
