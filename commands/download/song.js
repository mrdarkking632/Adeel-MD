const yts = require("yt-search");

module.exports = {
    name: "song",

    async execute(sock, msg, args) {

        if (!args.length) {
            return await sock.sendMessage(msg.key.remoteJid, {
                text: "❌ Usage:\n.song Believer"
            });
        }

        const query = args.join(" ");

        await sock.sendMessage(msg.key.remoteJid, {
            text: "🔍 Searching songs..."
        });

        try {

            const search = await yts(query);

            if (!search.videos.length) {
                return await sock.sendMessage(msg.key.remoteJid, {
                    text: "❌ No results found."
                });
            }

            const songs = search.videos.slice(0, 5);

            let text = `🎵 *Adeel-MD Song Search*\n\n`;

            songs.forEach((s, i) => {
                text += `${i + 1}. ${s.title}

👤 ${s.author.name}
⏱️ ${s.timestamp}
👀 ${s.views}
🔗 ${s.url}

`;
            });

            await sock.sendMessage(msg.key.remoteJid, {
                text: text + "👑 Powered By Adeel-MD"
            });

        } catch (err) {

            console.log("Song Error:", err);

            await sock.sendMessage(msg.key.remoteJid, {
                text: "❌ Song search failed."
            });

        }

    }
};
