module.exports = {
    name: "code",

    async execute(sock, msg) {
        await sock.sendMessage(msg.key.remoteJid, {
            text: `
💻 Code AI

Use:
.code your problem

⚡ Developer Assistant
`
        });
    }
};
