const { DisconnectReason } = require("@whiskeysockets/baileys");

module.exports = function connectionHandler(sock, startBot) {

    sock.ev.on("connection.update", (update) => {

        const { connection, lastDisconnect } = update;

        if (connection === "open") {
            console.clear();
            console.log(`
╔══════════════════════════════╗
║      👑 ADEEL-MD ONLINE      ║
╠══════════════════════════════╣
║ ✅ Status : Connected        ║
║ ☁️ Server : Heroku           ║
║ 🚀 Version : 3.0.0           ║
╚══════════════════════════════╝
`);
        }

        if (connection === "close") {

            const shouldReconnect =
                lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;

            console.log("❌ Connection Closed");

            if (shouldReconnect) {
                console.log("🔄 Reconnecting...");
                startBot();
            } else {
                console.log("🚪 Logged Out");
            }
        }

    });

};
