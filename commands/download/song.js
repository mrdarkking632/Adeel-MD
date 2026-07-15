const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");
const yts = require("yt-search");

module.exports = {
    name: "song",

    async execute(sock, msg, args) {

        const query = args.join(" ");

        if (!query) {
            return sock.sendMessage(msg.key.remoteJid, {
                text: "❌ Example:\n.song pasoori"
            });
        }

        const jid = msg.key.remoteJid;

        try {

            await sock.sendMessage(jid, {
                text: "🔎 Searching YouTube..."
            });

            const search = await yts(query);

            if (!search.videos.length) {
                return sock.sendMessage(jid, {
                    text: "❌ Song not found."
                });
            }

            const video = search.videos[0];

            const output = path.join(
                __dirname,
                "../../temp",
                `${Date.now()}.mp3`
            );

            await sock.sendMessage(jid, {
                text:
`🎵 Downloading...

📀 ${video.title}
⏳ ${video.timestamp}`
            });

            exec(
                `yt-dlp -x --audio-format mp3 -o "${output}" "${video.url}"`,
                async (error) => {

                    if (error) {
                        console.log(error);

                        return sock.sendMessage(jid, {
                            text: "❌ Song download failed."
                        });
                    }

                    await sock.sendMessage(jid, {
                        audio: fs.readFileSync(output),
                        mimetype: "audio/mpeg",
                        fileName: `${video.title}.mp3`
                    });

                    fs.unlinkSync(output);
                }
            );

        } catch (err) {

            console.log(err);

            await sock.sendMessage(jid, {
                text: "❌ Error occurred."
            });

        }
    }
};
