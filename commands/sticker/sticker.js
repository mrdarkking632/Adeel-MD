module.exports = {
    name: "sticker",

    async execute(sock, msg) {
        await sock.sendMessage(msg.key.remoteJid, {
            text: `
🖼️ Sticker Maker

Image par reply karke:
.sticker

⏳ Sticker system ready...
`
        });
    }
};
