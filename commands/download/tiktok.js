const { ttdl } = require("btch-downloader");

module.exports = {
    name: "tiktok",

    async execute(sock, msg, args) {
        const url = args.join(" ");

        if (!url) {
            return await sock.sendMessage(msg.key.remoteJid, {
                text: "❌ Example:\n.tiktok https://vt.tiktok.com/xxxxx"
            });
        }

        try {
            await sock.sendMessage(msg.key.remoteJid, {
                text: "⏳ Downloading TikTok..."
            });

            const data = await ttdl(url);

            await sock.sendMessage(msg.key.remoteJid, {
                video: { url: data.video },
                caption: `✅ TikTok Downloaded\n\n👑 Adeel-MD`
            });

        } catch (e) {
            console.log(e);

            await sock.sendMessage(msg.key.remoteJid, {
                text: "❌ Download Failed."
            });
        }
    }
};
