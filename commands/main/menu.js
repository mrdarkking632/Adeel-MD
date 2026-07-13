module.exports = {
    name: "menu",

    async execute(sock, msg) {

        const menu = `
╭────────────────────────╮
│ 👑 𝗔𝗗𝗘𝗘𝗟-𝗠𝗗 👑
│ 『 𝗣𝗥𝗘𝗠𝗜𝗨𝗠 𝗘𝗗𝗜𝗧𝗜𝗢𝗡 』
╰────────────────────────╯

👋 Hello Adeel

╭────〔 🤖 BOT INFO 〕────╮
│ 👑 Owner : Adeel
│ ⚡ Prefix : .
│ 🟢 Status : Online
│ 📦 Version : 3.0.0
╰──────────────────────╯

╭────〔 ⚡ COMMANDS 〕────╮
┃ 🏓 .ping
┃ 💓 .alive
┃ 👤 .owner
┃ 🌤️ .weather
┃ ⏰ .time
┃ ℹ️ .info
┃ 🎨 .sticker
┃ 🤖 .ai
╰──────────────────────╯

╭────〔 💎 QUOTE 〕────╮
┃ Code. Create. Conquer.
╰────────────────────╯

👑 Powered By Adeel-MD
⚡ Fast • Secure • Premium
`;

        await sock.sendMessage(msg.key.remoteJid, {
            text: menu
        });
    }
};
