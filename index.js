const {
    default: makeWASocket,
    useMultiFileAuthState,
    DisconnectReason
} = require("@whiskeysockets/baileys");

const P = require("pino");

const config = require("./config");

const { loadCommands } = require("./handlers/command");
const messageHandler = require("./handlers/message");
const connectionHandler = require("./handlers/connection");

async function startBot() {

    const { state, saveCreds } = await useMultiFileAuthState("./auth");

    const sock = makeWASocket({
        auth: state,
        logger: P({ level: "silent" }),
        browser: ["Adeel-MD", "Chrome", "1.0.0"]
    });

    sock.ev.on("creds.update", saveCreds);

    loadCommands();

    connectionHandler(sock, startBot);

    sock.ev.on("messages.upsert", async ({ messages }) => {

        const msg = messages[0];

        if (!msg) return;

        if (msg.key.fromMe) return;

        await messageHandler(sock, msg);

    });
      

}
startBot().catch((err) => {
    console.log("❌ Bot Crash:", err);
});

process.on("uncaughtException", (err) => {
    console.log("❌ Uncaught Exception:", err);
});

process.on("unhandledRejection", (reason) => {
    console.log("❌ Unhandled Rejection:", reason);
});
