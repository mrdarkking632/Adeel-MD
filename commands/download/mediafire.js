module.exports = {
    name: "mediafire",

    async execute(sock, msg) {
        await sock.sendMessage(msg.key.remoteJid, {
            text: `
📂 MediaFire Downloader

Use:
.mediafire link

⏳ MediaFire system connecting...
`
        });
    }
};
