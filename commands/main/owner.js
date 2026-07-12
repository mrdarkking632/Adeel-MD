module.exports = {
    name: "owner",

    async execute(sock, msg) {
        await sock.sendMessage(msg.key.remoteJid, {
            text: `
╭━━━〔 👑 OWNER 〕━━━┈⊷
┃ 👤 Name : Adeel
┃ 🤖 Bot  : Adeel-MD
┃ 📞 Contact : 03288835468
╰━━━━━━━━━━━━━━━━━━┈⊷
`
        });
    }
};
