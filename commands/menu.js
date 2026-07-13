
const path = require("path");
const config = require("../config");
module.exports = {
    name: "menu",

    async execute(sock, msg) {

        const hour = new Date().toLocaleString("en-US", {
            timeZone: "Asia/Karachi",
            hour: "numeric",
            hour12: false
        });

        let greeting;

        if (hour >= 5 && hour < 12) greeting = "🌅 Good Morning";
        else if (hour >= 12 && hour < 17) greeting = "☀️ Good Afternoon";
        else if (hour >= 17 && hour < 20) greeting = "🌆 Good Evening";
        else greeting = "🌙 Good Night";

        const quotes = [
            "🚀 Dream Big. Build Bigger.",
            "💎 Code. Create. Conquer.",
            "⚡ Innovation Starts Here.",
            "❤️ Built With Passion.",
            "🔥 Never Stop Learning.",
            "🌟 Success Begins Today.",
            "👑 Excellence Is A Habit.",
            "🎯 Stay Focused. Stay Strong."
        ];

        const themes = [
            "💙 Blue Premium",
            "💜 Purple Royal",
            "💚 Emerald",
            "❤️ Crimson",
            "🖤 Midnight",
            "💛 Gold Elite"
        ];

        const quote = quotes[Math.floor(Math.random() * quotes.length)];
        const theme = themes[Math.floor(Math.random() * themes.length)];

        const username =
            msg.pushName ||
            msg.key.participant?.split("@")[0] ||
            msg.key.remoteJid.split("@")[0];

        const time = new Date().toLocaleTimeString("en-PK", {
            timeZone: "Asia/Karachi"
        });

        const date = new Date().toLocaleDateString("en-PK", {
            timeZone: "Asia/Karachi"
        });

    const imagePath = path.join(__dirname, "../media/menu/menu.jpg");

await sock.sendMessage(msg.key.remoteJid, {
    image: { url: imagePath },
    caption: `
╭────────────────────────╮
│ 👑 𝗔𝗗𝗘𝗘𝗟-𝗠𝗗 👑
│ 『 𝗣𝗥𝗘𝗠𝗜𝗨𝗠 𝗘𝗗𝗜𝗧𝗜𝗢𝗡 』
╰────────────────────────╯

${greeting}, ${username} 👋

╭────〔 🤖 BOT INFO 〕────╮
│ 👤 User    : ${username}
│ 👑 Owner   : ${config.OWNER_NAME}
│ ⚡ Prefix  : ${config.PREFIX}
│ ☁️ Server  : Heroku
│ 📦 Version : ${config.VERSION}
│ 🟢 Status  : Online
│ 🕒 Time    : ${time}
│ 📅 Date    : ${date}
╰──────────────────────╯

╭────〔 ⚡ COMMANDS 〕────╮
┃ 🎵 Downloader
┃ 🖼️ Sticker
┃ 🤖 AI
┃ 👥 Group
┃ 🛡️ Admin
┃ ⚙️ Utility
┃ 🎭 Fun
╰──────────────────────╯

╭────〔 💎 QUOTE 〕────╮
┃ ${quote}
╰────────────────────╯

╭────〔 🎨 THEME 〕────╮
┃ ${theme}
╰────────────────────╯

👑 Powered By ${config.BOT_NAME}
⚡ Fast • Secure • Premium
`
        });
    }
};
