module.exports = {
    name: "tiktok",

    async execute(sock, msg) {
        await sock.sendMessage(msg.key.remoteJid, {
            text: `
📱 TikTok Downloader

Use:
.tiktok link

⏳ TikTok system connecting...
`
        });
    }
};
