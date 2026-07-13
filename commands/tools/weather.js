
module.exports = {
    name: "weather",

    async execute(sock, msg, args) {

        const city = args.join(" ");

        if (!city) {
            return sock.sendMessage(msg.key.remoteJid, {
                text: "🌤️ Example:\n.weather Lahore"
            });
        }

        await sock.sendMessage(msg.key.remoteJid, {
            text: `🌤️ Weather Search

📍 Location: ${city}

⏳ Checking weather...

🥱 Adeel-MD`
        });

    }
};
