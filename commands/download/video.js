const yts = require("yt-search");

module.exports = {
    name: "video",

    async execute(sock, msg, args) {

        if (!args.length) {
            return await sock.sendMessage(msg.key.remoteJid, {
                text: "❌ Usage:\n.video song name"
            });
        }

        const query = args.join(" ");

        await sock.sendMessage(msg.key.remoteJid, {
            text: "🔍 Searching videos..."
        });

        try {

            const search = await yts(query);

            if (!search.videos.length) {
                return await sock.sendMessage(msg.key.remoteJid, {
                    text: "❌ No results found."
                });
            }

            const videos = search.videos.slice(0, 5);

            let text = `🎬 *Adeel-MD Video Search*\n\n`;

            videos.forEach((v, i) => {
                text += 
`${i + 1}. ${v.title}

👤 ${v.author.name}
⏱️ ${v.timestamp}
👀 ${v.views}
🔗 ${v.url}

`;
            });

            await sock.sendMessage(msg.key.remoteJid, {
                text: text + "👑 Powered By Adeel-MD"
            });

        } catch (err) {

            console.log("Video Error:", err);

            await sock.sendMessage(msg.key.remoteJid, {
                text: "❌ Video search failed."
            });

        }

    }
};
