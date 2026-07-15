const axios = require("axios");

module.exports = {
    name: "weather",

    async execute(sock, msg, args) {

        const city = args.join(" ");

        if (!city) {
            return await sock.sendMessage(msg.key.remoteJid, {
                text: "🌤️ Example:\n.weather Lahore"
            });
        }

        try {

            const apiKey = process.env.OPENWEATHER_API_KEY;

            if (!apiKey) {
                return await sock.sendMessage(msg.key.remoteJid, {
                    text: "❌ OPENWEATHER_API_KEY not found in .env"
                });
            }

            const { data } = await axios.get(
                "https://api.openweathermap.org/data/2.5/weather",
                {
                    params: {
                        q: city,
                        appid: apiKey,
                        units: "metric"
                    }
                }
            );

            await sock.sendMessage(msg.key.remoteJid, {
                text:
`🌤️ *Adeel-MD Weather*

📍 City: ${data.name}, ${data.sys.country}

🌡️ Temperature: ${data.main.temp}°C
🥵 Feels Like: ${data.main.feels_like}°C
💧 Humidity: ${data.main.humidity}%
🌬️ Wind Speed: ${data.wind.speed} m/s
☁️ Condition: ${data.weather[0].main}
📝 Description: ${data.weather[0].description}

👑 Powered By Adeel-MD`
            });

        } catch (err) {

            console.log(err.response?.data || err.message);

            await sock.sendMessage(msg.key.remoteJid, {
                text: "❌ City not found or Weather API error."
            });

        }

    }
};
