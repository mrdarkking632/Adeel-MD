require("dotenv").config();
const {
    default: makeWASocket,
    useMultiFileAuthState,
    DisconnectReason,
    downloadMediaMessage
} = require("@whiskeysockets/baileys");

const P = require("pino");
const qrcode = require("qrcode-terminal");

const { loadCommands, commands } = require("./handlers/command");
const connectionHandler = require("./handlers/connection");
const messageDB = require("./database/messages");
const messageHandler = require("./handlers/message");
const antiDelete = require("./handlers/antidelete");
const autoSaveContact = require("./handlers/autoSaveContact");
loadCommands();

async function startBot() {

    const { state, saveCreds } = await useMultiFileAuthState("./auth");

    const sock = makeWASocket({
    auth: state,
    logger: P({ level: "silent" }),
    printQRInTerminal: true
});
if (!state.creds.registered) {
    const phoneNumber = "923288835468";

    try {
        await new Promise(resolve => setTimeout(resolve, 5000));
        const code = await sock.requestPairingCode(phoneNumber);
        console.log("📱 Pairing Code:", code);
    } catch (err) {
        console.log("❌ Pairing Error:", err.message);
    }
}
    sock.ev.on("creds.update", saveCreds);

    sock.ev.on("connection.update", (update) => {
    connectionHandler(update, startBot);
});

    console.log("🤖 Adeel-MD Starting...");
        sock.ev.on("messages.upsert", async ({ messages }) => {

        const msg = messages[0];
messageDB.save(msg.key.id, msg);
            console.log("SAVED MESSAGE TYPE:");
console.log(Object.keys(msg.message || {}));
        if (!msg.message) return;

        const text =
            msg.message.conversation ||
            msg.message.extendedTextMessage?.text ||
            "";

        if (!text.startsWith(".")) return;

        const args = text
            .slice(1)
            .trim()
            .split(/ +/);

        const commandName = args.shift().toLowerCase();

        const command = commands.get(commandName);

        if (!command) return;

        try {

            await command.execute(
                sock,
                msg,
                args
            );

        } catch (error) {

            console.log("Command Error:", error);

            await sock.sendMessage(
                msg.key.remoteJid,
                {
                    text: "❌ Command Error"
                }
            );

                }

    });
    sock.ev.on("messages.update", async (updates) => {
    console.log("MESSAGES.UPDATE");
    console.log(JSON.stringify(updates, null, 2));

    await antiDelete(sock, updates);
});

sock.ev.on("messages.delete", (updates) => {
    console.log("MESSAGES.DELETE");
    console.log(JSON.stringify(updates, null, 2));
});
}
   startBot();
process.on("uncaughtException", (err) => {
    console.log("❌ Error:", err);
});

process.on("unhandledRejection", (err) => {
    console.log("❌ Promise Error:", err);
});
