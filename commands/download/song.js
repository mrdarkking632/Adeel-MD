const fs = require("fs");
const path = require("path");
const yts = require("yt-search");
const ytdl = require("@distube/ytdl-core");
const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;

ffmpeg.setFfmpegPath(ffmpegPath);

module.exports = {
    name: "song",

    async execute(sock, msg, args) {

        const query = args.join(" ");

        if (!query) {
            return await sock.sendMessage(msg.key.remoteJid, {
                text:
`❌ Example

.song pasoori`
            });
        }

        try {

            await sock.sendMessage(msg.key.remoteJid, {
                text: "🔎 Searching YouTube..."
            });

            const search = await yts(query);

            if (!search.videos.length) {
                return await sock.sendMessage(msg.key.remoteJid, {
                    text: "❌ Song not found."
                });
            }

            const video = search.videos[0];

            const output = path.join(
                __dirname,
                "../../temp",
                `${Date.now()}.mp3`
            );

            await sock.sendMessage(msg.key.remoteJid, {
                text:
`🎵 Downloading...

📀 ${video.title}
⏳ ${video.timestamp}`
            });

            await new Promise((resolve, reject) => {

                ffmpeg(
                    ytdl(video.url, {
                        quality: "highestaudio",
                        filter: "audioonly"
                    })
                )                    .audioBitrate(128)
                    .save(output)
                    .on("end", resolve)
                    .on("error", reject);

            });

            await sock.sendMessage(
                msg.key.remoteJid,
                {
                    audio: fs.readFileSync(output),
                    mimetype: "audio/mpeg",
                    fileName: `${video.title}.mp3`
                }
            );

            fs.unlinkSync(output);

        } catch (err) {

            console.log(err);

            await sock.sendMessage(msg.key.remoteJid, {
                text: "❌ Song download failed."
            });

        }

    }

};
