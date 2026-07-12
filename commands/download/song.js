module.exports = {
    name: "song",

    async execute(sock, msg) {
        await sock.sendMessage(msg.key.remoteJid, {
            text: `
🎵 Song Downloader

Use:
.song song-name

Example:
.song pasoori

⏳ Download system connecting...
`
        });
    }
};
