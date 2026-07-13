module.exports = {
    name: "weather",

    async execute(sock, msg, args) {

        const city = args.join(" ");

        if (!city) {
            return sock.sendMessage(msg.key.remoteJid, {
                text: "🌤️ Example:\n.weather Lahore"
            });
        }

        try {

            const res = await fetch(
                `https://wttr.in/${encodeURIComponent(city)}?format=3`
            );

            const data = await res.text();

            await sock.sendMessage(msg.key.remoteJid, {
                text: `🌤️ Adeel-MD Weather

📍 City: ${city}

${data}

🥸 Powered By Adeel-MD`
            });

        } catch (e) {

            await sock.sendMessage(msg.key.remoteJid, {
                text: "❌ Weather service error"
            });

        }
    }
};
