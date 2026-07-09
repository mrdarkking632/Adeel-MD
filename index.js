const {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason
} = require("@whiskeysockets/baileys");

const P = require("pino");
const qrcode = require("qrcode-terminal");

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState("./auth");

  const sock = makeWASocket({
    auth: state,
    logger: P({ level: "silent" })
  });

  sock.ev.on("creds.update", saveCreds);

  sock.ev.on("connection.update", ({ connection, lastDisconnect, qr }) => {
    if (qr) {
      console.log("📱 Scan this QR:");
      qrcode.generate(qr, { small: true });
    }

    if (connection === "open") {
      console.log("✅ Bot Connected Successfully!");
    }

    if (connection === "close") {
      const shouldReconnect =
        lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;

      console.log("❌ Connection Closed. Reconnecting...");

      if (shouldReconnect) {
        startBot();
      }
    }
  });

  sock.ev.on("messages.upsert", async ({ messages }) => {
    const msg = messages[0];

    if (!msg.message || msg.key.fromMe) return;

    const text =
      msg.message.conversation ||
      msg.message.extendedTextMessage?.text ||
      "";

    if (text === ".ping") {
      await sock.sendMessage(msg.key.remoteJid, {
        text: "🏓 Pong! Bot Online ✅"
      });
    }

    if (text === ".menu") {
      await sock.sendMessage(msg.key.remoteJid, {
       text: "🤖 *Adeel Bot*\n\n📋 Commands:\n.ping\n.menu\n.owner\n.alive"
      });
    }
if (text === ".owner") {
  await sock.sendMessage(msg.key.remoteJid, {
    text: "👑 Owner: Adeel"
  });
}
  });
}

startBot();

 
