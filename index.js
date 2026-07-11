const {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason,
  downloadMediaMessage
} = require("@whiskeysockets/baileys");

const P = require("pino");
const qrcode = require("qrcode-terminal");
const { Image } = require("node-webpmux");
const fs = require("fs");
const { exec } = require("child_process");
const path = require("path");
const yts = require("yt-search");
const ytdl = require("@distube/ytdl-core");
const { execSync } = require("child_process");
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
console.log("📩 Message event received");
const text =
  msg.message.conversation ||
  msg.message.extendedTextMessage?.text ||
  "";
console.log("TEXT:", text);
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
    if (text.startsWith(".music ")) {
  const query = text.replace(".music", "").trim();

  if (!query) {
    return await sock.sendMessage(msg.key.remoteJid, {
      text: "🎵 Example: .music pasoori"
    });
  }

  await sock.sendMessage(msg.key.remoteJid, {
    text: "🔍 Song dhoond raha hoon..."
  });

  try {
    const result = await yts(query);

    if (!result.videos.length) {
      return await sock.sendMessage(msg.key.remoteJid, {
        text: "❌ Song nahi mila."
      });
    }

    const video = result.videos[0];
    const file = "./temp/song.mp3";

    execSync(`yt-dlp -x --audio-format mp3 -o "${file}" "${video.url}"`);

    await sock.sendMessage(msg.key.remoteJid, {
      audio: fs.readFileSync(file),
      mimetype: "audio/mpeg",
      fileName: video.title + ".mp3"
    });

    fs.unlinkSync(file);

  } catch (e) {
    console.log(e);

    await sock.sendMessage(msg.key.remoteJid, {
      text: "❌ Audio download failed."
    });
  }
    }
    if (text === ".sticker" && msg.message.extendedTextMessage) {
  console.log("Sticker command received");
      try {
    const quoted = msg.message.extendedTextMessage.contextInfo;

    if (!quoted || !quoted.quotedMessage) {
      return await sock.sendMessage(msg.key.remoteJid, {
        text: "🖼️ Image par reply karke .sticker likho"
      });
    }

    const quotedMsg = {
      key: {
        remoteJid: msg.key.remoteJid,
        id: quoted.stanzaId,
        participant: quoted.participant
      },
      message: quoted.quotedMessage
    };

    const buffer = await downloadMediaMessage(
      quotedMsg,
      "buffer",
      {}
    );
        const inputPath = path.join(__dirname, "temp", "input.jpg");
const outputPath = path.join(__dirname, "temp", "output.webp");

fs.writeFileSync(inputPath, buffer);
console.log("Image downloaded:", buffer.length);
    await new Promise((resolve, reject) => {
  exec(
    `ffmpeg -y -i "${inputPath}" -vf "scale=512:512:force_original_aspect_ratio=decrease,pad=512:512:(ow-iw)/2:(oh-ih)/2:color=white" "${outputPath}"`,
    (err) => {
      if (err) return reject(err);

      sock.sendMessage(msg.key.remoteJid, {
        sticker: fs.readFileSync(outputPath)
      }).then(() => {
        fs.unlinkSync(inputPath);
        fs.unlinkSync(outputPath);
        resolve();
      }).catch(reject);
    }
  );
});   

  } catch (e) {
    console.log(e);
  }
    }
  });
}

startBot();

 
