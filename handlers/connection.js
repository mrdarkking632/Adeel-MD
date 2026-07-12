module.exports = {
    handleConnection: (update) => {
        const { connection } = update;

        if (connection === "open") {
            console.log("✅ Bot Connected Successfully!");
        }

        if (connection === "close") {
            console.log("❌ Connection Closed");
        }
    }
};
