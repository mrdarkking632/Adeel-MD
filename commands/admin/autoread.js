module.exports = {
    name: "autoread",

    async execute(sock, msg) {
        await sock.sendMessage(msg.key.remoteJid, {
            text: "👀 Auto Read feature ready."
        });
    }
};
