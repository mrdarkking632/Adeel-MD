if (connection === "close") {
    console.log("Disconnect reason:", lastDisconnect);

    const statusCode = lastDisconnect?.error?.output?.statusCode;
    console.log("Status Code:", statusCode);

    if (statusCode === DisconnectReason.loggedOut) {
        console.log("🚪 Logged Out");
        return;
    }

    console.log("❌ Connection Closed. Reconnecting...");
    setTimeout(() => startBot(), 3000);
}
