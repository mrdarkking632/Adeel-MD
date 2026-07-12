module.exports = {
    name: "facebook",

    async execute(sock, msg) {
        await sock.sendMessage(msg.key.remoteJid, {
            text: `
📘 Facebook Downloader

Use:
.facebook link

⏳ Facebook system connecting...
`
        });
    }
};
