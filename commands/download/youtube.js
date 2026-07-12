module.exports = {
    name: "youtube",

    async execute(sock, msg) {
        await sock.sendMessage(msg.key.remoteJid, {
            text: `
▶️ YouTube Downloader

Use:
.youtube link

⏳ YouTube system connecting...
`
        });
    }
};
