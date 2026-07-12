module.exports = {
    name: "runtime",

    async execute(sock, msg) {

        let uptime = process.uptime();

        let hours = Math.floor(uptime / 3600);
        let minutes = Math.floor((uptime % 3600) / 60);
        let seconds = Math.floor(uptime % 60);

        await sock.sendMessage(msg.key.remoteJid, {
            text: `
⏱️ Runtime

🟢 Online Time:
${hours}h ${minutes}m ${seconds}s

🤖 Adeel-MD
`
        });
    }
};
