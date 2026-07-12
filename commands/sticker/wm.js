module.exports = {
    name: "wm",

    async execute(sock, msg) {
        await sock.sendMessage(msg.key.remoteJid, {
            text: `
✍️ Sticker Watermark

Use:
.wm name|author

⚡ Adeel-MD
`
        });
    }
};
