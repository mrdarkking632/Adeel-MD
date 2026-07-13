const os = require("os");
const { commands } = require("../../handlers/command");

module.exports = {
    name: "system",

    async execute(sock, msg) {

        const uptime = process.uptime();

        const hours = Math.floor(uptime / 3600);
        const minutes = Math.floor((uptime % 3600) / 60);
        const seconds = Math.floor(uptime % 60);

        const used = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
        const total = (os.totalmem() / 1024 / 1024 / 1024).toFixed(2);

        await sock.sendMessage(msg.key.remoteJid, {
            text: `💻 *Adeel-MD System*

🟢 Status : Online
⚙️ Platform : ${os.platform()}
🧠 Node.js : ${process.version}
📦 Commands : ${commands.size}
⏳ Uptime : ${hours}h ${minutes}m ${seconds}s
💾 RAM Used : ${used} MB
💽 Total RAM : ${total} GB

👑 Powered By Adeel-MD`
        });

    }
};
