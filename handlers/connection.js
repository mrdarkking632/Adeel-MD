const { DisconnectReason } = require("@whiskeysockets/baileys");

module.exports = function connectionHandler(sock, startBot) {

    sock.ev.on("connection.update", ({ connection, lastDisconnect }) => {

        if (connection === "connecting") {
            console.log("🔄 Connecting...");
        }

        if (connection === "open") {
            console.log("✅ Bot Connected Successfully!");
        }

        if (connection === "close") {

            const statusCode =
                lastDisconnect?.error?.output?.statusCode;

            if (statusCode === DisconnectReason.loggedOut) {
                console.log("🚪 Logged Out");
                return;
            }

            console.log("❌ Connection Closed. Reconnecting...");

            setTimeout(() => {
                startBot();
            }, 3000);
        }
    });

};
