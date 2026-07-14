const yts = require("yt-search");

module.exports = {
    name: "video",

    async execute(sock, msg, args) {

        if (!args.length) {
            return await sock.sendMessage(msg.key.remoteJid, {
                text: "❌ Usage:\n.video Pasoori"
            });
        }

        const query = args.join(" ");

        await sock.sendMessage(msg.key.remoteJid, {
            text: "🔍 Searching video..."
        });

        try {

            const search = await yts(query);

            if (!search.videos.length) {
                return await sock.sendMessage(msg.key.remoteJid, {
                    text: "❌ No video found."
                });
            }

            const video = search.videos[0];

            await sock.sendMessage(msg.key.remoteJid, {
                image: {
                    url: video.thumbnail
                },
                caption:
`🎬 *${video.title}*

👤 Channel: ${video.author.name}
⏱️ Duration: ${video.timestamp}
👀 Views: ${video.views}

🔗 ${video.url}

⚠️ Video download module pending.`
            });

        } catch (err) {

            console.log("Video Error:", err);

            await sock.sendMessage(msg.key.remoteJid, {
                text: "❌ Video search failed."
            });

        }

    }
};
