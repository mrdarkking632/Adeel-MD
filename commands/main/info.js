module.exports = {
    name: "info",

    async execute(sock, msg) {
        await sock.sendMessage(msg.key.remoteJid, {
            text: `
╭━━━〔 🤖 𝗕𝗢𝗧 𝗜𝗡𝗙𝗢 〕━━━┈⊷
┃ 👑 Name : Adeel-MD
┃ 👤 Owner : Adeel
┃ ⚡ Version : 3.0.0
┃ 🔰 Mode : Public
┃ ☁️ Host : Heroku
╰━━━━━━━━━━━━━━━━━━┈⊷

🔥 Fast • Secure • Premium
`
        });
    }
};
