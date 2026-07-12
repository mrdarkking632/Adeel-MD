module.exports = {
    name: "attp",

    async execute(sock, msg) {
        await sock.sendMessage(msg.key.remoteJid, {
            text: `
✨ Animated Text Sticker

Use:
.attp your text

⚡ Adeel-MD
`
        });
    }
};
