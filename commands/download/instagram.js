const { igdl } = require("btch-downloader");

module.exports = {
    name: "instagram",

    async execute(sock, msg, args) {
        const url = args.join(" ");

        if (!url) {
            return await sock.sendMessage(msg.key.remoteJid, {
                text: "❌ Example:\n.instagram https://www.instagram.com/reel/xxxxx/"
            });
        }

        try {
            await sock.sendMessage(msg.key.remoteJid, {
                text: "⏳ Downloading Instagram..."
            });

            const data = await igdl(url);
console.log(JSON.stringify(data, null, 2));
            const video =
    data?.result?.[0]?.url ||
    data?.result?.[0]?.video ||
    data?.video ||
    data?.url ||
    data?.[0]?.url ||
    data?.[0]?.video;

            if (!video) {
                throw new Error("Video not found");
            }

            await sock.sendMessage(msg.key.remoteJid, {
                video: { url: video },
                caption: "✅ Instagram Downloaded\n\n👑 Adeel-MD"
            });

        } catch (e) {
            console.log(e);

            await sock.sendMessage(msg.key.remoteJid, {
                text: "❌ Instagram Download Failed."
            });
        }
    }
};
