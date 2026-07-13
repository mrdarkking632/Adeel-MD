const os = require("os");
const { commands } = require("../../handlers/command");

module.exports = {
    name: "stats",

    async execute(sock, msg) {

        const uptime = process.uptime();

        const days = Math.floor(uptime / 86400);
        const hours = Math.floor((uptime % 86400) / 3600);
        const minutes = Math.floor((uptime % 3600) / 60);
        const seconds = Math.floor(uptime % 60);

        const ram = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);

        await sock.sendMessage(msg.key.remoteJid, {
            text:
`📊 *Adeel-MD Statistics*

🤖 Bot      : Adeel-MD
📦 Version  : 3.2.0
📚 Commands : ${commands.size}
🧠 Node.js  : ${process.version}
📱 Platform : ${os.platform()}

⏳ Uptime
${days}d ${hours}h ${minutes}m ${seconds}s

💾 RAM Usage
${ram} MB

👑 Powered By Adeel-MD`
        });

    }
};
