const {
    default: makeWASocket,
    useMultiFileAuthState,
    DisconnectReason
} = require("@whiskeysockets/baileys");

const P = require("pino");
const qrcode = require("qrcode-terminal");

const { loadCommands, commands } = require("./handlers/command");
const connectionHandler = require("./handlers/connection");

loadCommands();

async function startBot() {

    const { state, saveCreds } = await useMultiFileAuthState("./auth");

    const sock = makeWASocket({
        auth: state,
        logger: P({ level: "silent" })
    });

    sock.ev.on("creds.update", saveCreds);

    connectionHandler(sock, startBot);

    console.log("🤖 Adeel-MD Starting...");
        sock.ev.on("messages.upsert", async ({ messages }) => {

        const msg = messages[0];

        if (!msg.message) return;

        const text =
            msg.message.conversation ||
            msg.message.extendedTextMessage?.text ||
            "";

        if (!text.startsWith(".")) return;

        const args = text
            .slice(1)
            .trim()
            .split(/ +);

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
    }

startBot();

process.on("uncaughtException", (err) => {
    console.log("❌ Error:", err);
});

process.on("unhandledRejection", (err) => {
    console.log("❌ Promise Error:", err);
});
