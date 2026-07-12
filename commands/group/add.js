module.exports = {
    name: "add",

    async execute(sock, msg) {
        await sock.sendMessage(msg.key.remoteJid, {
            text: "➕ Add member feature ready."
        });
    }
};
