module.exports = {
    name: "emojimix",

    async execute(sock, msg) {
        await sock.sendMessage(msg.key.remoteJid, {
            text: `
😎 Emoji Mix

Use:
.emojimix 😀+🔥

⏳ Emoji system connecting...

⚡ Adeel-MD
`
        });
    }
};
