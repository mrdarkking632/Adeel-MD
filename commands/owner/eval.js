module.exports = {
    name: "eval",

    async execute(sock, msg) {
        await sock.sendMessage(msg.key.remoteJid, {
            text: "👑 Owner Eval Command"
        });
    }
};
