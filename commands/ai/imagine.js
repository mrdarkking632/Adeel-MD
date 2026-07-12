module.exports = {
    name: "imagine",

    async execute(sock, msg) {
        await sock.sendMessage(msg.key.remoteJid, {
            text: `
🎨 AI Image Generator

Use:
.imagine your idea

🖼️ Image system ready
`
        });
    }
};
