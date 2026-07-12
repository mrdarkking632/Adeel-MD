module.exports = {
    name: "gdrive",

    async execute(sock, msg) {
        await sock.sendMessage(msg.key.remoteJid, {
            text: `
📁 Google Drive Downloader

Use:
.gdrive link

⏳ GDrive system connecting...
`
        });
    }
};
