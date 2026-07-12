module.exports = {
    name: "insta",

    async execute(sock, msg) {
        await sock.sendMessage(msg.key.remoteJid, {
            text: `
📸 Instagram Downloader

Use:
.insta link

⏳ Instagram system connecting...
`
        });
    }
};
