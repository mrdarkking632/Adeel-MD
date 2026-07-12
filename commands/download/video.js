module.exports = {
    name: "video",

    async execute(sock, msg) {
        await sock.sendMessage(msg.key.remoteJid, {
            text: `
🎬 Video Downloader

Use:
.video video-name

Example:
.video pasoori

⏳ Video system connecting...
`
        });
    }
};
