const yts = require("yt-search");

module.exports = {
    name: "play",

    async execute(sock, msg, args) {

        if (!args.length) {
            return await sock.sendMessage(msg.key.remoteJid, {
                text: "❌ Usage:\n.play Believer"
            });
        }

        const query = args.join(" ");

        await sock.sendMessage(msg.key.remoteJid, {
            text: "🔍 Searching..."
        });

        try {

            const search = await yts(query);

            if (!search.videos.length) {
                return await sock.sendMessage(msg.key.remoteJid, {
                    text: "❌ No results found."
                });
            }

            const video = search.videos[0];

            await sock.sendMessage(msg.key.remoteJid, {
                image: { url: video.thumbnail },
                caption:
`🎵 ${video.title}

👤 Channel: ${video.author.name}
⏱️ Duration: ${video.timestamp}
👀 Views: ${video.views}

🔗 ${video.url}

⚠️ Audio download will be added in next update.`
            });

        } catch (err) {

            console.log(err);

            await sock.sendMessage(msg.key.remoteJid, {
                text: "❌ Search failed."
            });

        }

    }
};
