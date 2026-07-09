const {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason
} = require("@whiskeysockets/baileys");

const P = require("pino");
const qrcode = require("qrcode-terminal");
const sharp = require("sharp");
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

  if (!msg.message) return;

const text =
  msg.message.conversation ||
  msg.message.extendedTextMessage?.text ||
  "";

if (msg.key.fromMe && !text.startsWith(".")) return;
    if (text === ".ping") {
      await sock.sendMessage(msg.key.remoteJid, {
        text: "🏓 Pong! Bot Online ✅"
      });
    }

    if (text === ".menu") {
      await sock.sendMessage(msg.key.remoteJid, {
      text: "🤖 *Adeel Bot*\n\n📋 Commands:\n.ping\n.menu\n.owner\n.alive\n.time\n.info"
      });
    }
if (text === ".owner") {
  await sock.sendMessage(msg.key.remoteJid, {
    text: "👑 Owner: Adeel"
  });
}
    if (text === ".alive") {
  await sock.sendMessage(msg.key.remoteJid, {
    text: "🤖 *Adeel Bot*\n\n✅ Status: Online\n⚡ Speed: Fast\n👑 Owner: Adeel"
  });
    }
    if (text === ".time") {
  const time = new Date().toLocaleString("en-PK", {
    timeZone: "Asia/Karachi"
  });

  await sock.sendMessage(msg.key.remoteJid, {
    text: "🕒 Pakistan Time:\n" + time
  });
    }
     if (text === ".info") {
      await sock.sendMessage(msg.key.remoteJid, {
        text: "🤖 *Adeel-MD*\n\n👑 Owner: Adeel\n⚡ Version: 1.0\n💻 Powered by Adeel☝"
      });
    }
    if (text === ".help") {
  await sock.sendMessage(msg.key.remoteJid, {
    text: "❓ *Help Menu*\n\n.ping\n.menu\n.owner\n.alive\n.time\n.info\n.help"
  });
    }
    if (text === ".sticker") {
  await sock.sendMessage(msg.key.remoteJid, {
    text: "🖼️ Image bhej kar caption me .sticker likho"
  });
    }
  });
}

startBot();

 
