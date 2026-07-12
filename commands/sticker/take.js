module.exports = {
    name: "take",

    async execute(sock, msg) {
        await sock.sendMessage(msg.key.remoteJid, {
            text: `
🏷️ Sticker Take

Reply sticker:
.take pack|author

⚡ Adeel-MD
`
        });
    }
};
