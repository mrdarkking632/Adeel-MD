module.exports = {
    name: "play",

    async execute(sock, msg) {
        await sock.sendMessage(msg.key.remoteJid, {
            text: `
▶️ Play Command

Use:
.play song-name

🎵 Searching...
`
        });
    }
};
