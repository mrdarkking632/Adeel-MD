const { fbdown } = require("btch-downloader");

module.exports = {
    name: "facebook",

    async execute(sock, msg, args) {
        const url = args.join(" ");

        if (!url) {
            return await sock.sendMessage(msg.key.remoteJid, {
                text: "❌ Example:\n.facebook https://facebook.com/..."
            });
        }

        try {
            await sock.sendMessage(msg.key.remoteJid, {
                text: "⏳ Downloading Facebook Video..."
            });

            const data = await fbdown(url);

            console.log(JSON.stringify(data, null, 2));

            const video =
                data?.result?.url ||
                data?.result?.video ||
                data?.result?.[0]?.url ||
                data?.result?.[0]?.video ||
                data?.url ||
                data?.video;

            if (!video) {
                throw new Error("Video not found");
            }

            await sock.sendMessage(msg.key.remoteJid, {
                video: { url: video },
                caption: "✅ Facebook Downloaded\n\n👑 Adeel-MD"
            });

        } catch (e) {
            console.log(e);

            await sock.sendMessage(msg.key.remoteJid, {
                text: "❌ Facebook Download Failed."
            });
        }
    }
};
