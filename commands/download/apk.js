module.exports = {
    name: "apk",

    async execute(sock, msg) {
        await sock.sendMessage(msg.key.remoteJid, {
            text: `
📦 APK Downloader

Use:
.apk app-name

⏳ APK system connecting...
`
        });
    }
};
