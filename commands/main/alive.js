module.exports = {
    name: "alive",

    async execute(sock, msg) {
        await sock.sendMessage(msg.key.remoteJid, {
            text: `
╭━━━〔 🤖 𝗔𝗗𝗘𝗘𝗟-𝗠𝗗 〕━━━┈⊷
┃ 🟢 Status : Online
┃ ⚡ Speed  : Fast
┃ 👑 Owner  : Adeel
┃ 🔰 Mode   : Public
╰━━━━━━━━━━━━━━━━━━┈⊷

🔥 Bot is alive and running!
`
        });
    }
};
