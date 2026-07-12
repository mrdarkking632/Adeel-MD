module.exports = {
    name: "help",

    async execute(sock, msg) {
        await sock.sendMessage(msg.key.remoteJid, {
            text: `
╭━━━〔 📚 HELP 〕━━━┈⊷
┃ .menu
┃ .ping
┃ .alive
┃ .owner
┃ .info
┃ .runtime
┃ .speed
╰━━━━━━━━━━━━━━━━━━┈⊷

👑 Adeel-MD
`
        });
    }
};
