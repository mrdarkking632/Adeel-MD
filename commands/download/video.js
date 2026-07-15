const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");
const yts = require("yt-search");

module.exports = {
    name: "video",

    async execute(sock, msg, args) {

        const query = args.join(" ");

        if (!query) {
            return sock.sendMessage(msg.key.remoteJid, {
                text: "❌ Example:\n.video pasoori"
            });
        }

        const jid = msg.key.remoteJid;

        try {

            await sock.sendMessage(jid, {
                text: "🔎 Searching video..."
            });

            const search = await yts(query);

            if (!search.videos.length) {
                return sock.sendMessage(jid, {
                    text: "❌ Video not found."
                });
            }

            const video = search.videos[0];

            const output = path.join(
                __dirname,
                "../../temp",
                `${Date.now()}.mp4`
            );

            await sock.sendMessage(jid, {
                text:
`🎬 Downloading...

📀 ${video.title}
⏳ ${video.timestamp}`
            });

            exec(
                `yt-dlp -f "mp4" -o "${output}" "${video.url}"`,
                async (error) => {

                    if (error) {
                        console.log(error);

                        return sock.sendMessage(jid, {
                            text: "❌ Video download failed."
                        });
                    }

                    await sock.sendMessage(jid, {
                        video: fs.readFileSync(output),
                        caption: `🎬 ${video.title}`
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
