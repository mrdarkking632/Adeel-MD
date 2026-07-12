module.exports = {
    name: "hack",

    async execute(sock, msg) {
        await sock.sendMessage(msg.key.remoteJid, {
            text: "💻 Hack command ready (fun only)."
        });
    }
};
