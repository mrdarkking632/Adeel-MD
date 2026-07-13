module.exports = function handleConnection(update, startBot) {
    const { connection, lastDisconnect } = update;

    if (connection === "open") {
        console.log("✅ Bot Connected Successfully!");
    }

    if (connection === "close") {
        console.log("❌ Connection Closed");

        const shouldReconnect = true;

        if (shouldReconnect) {
            startBot();
        }
    }
};
