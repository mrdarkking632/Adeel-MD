module.exports = {
    name: "demote",

    async execute(sock, msg) {
        await sock.sendMessage(msg.key.remoteJid, {
            text: "⬇️ Demote feature ready."
        });
    }
};
