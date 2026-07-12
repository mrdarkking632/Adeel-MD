module.exports = {
    name: "uptime",

    async execute(sock, msg) {

        let up = Math.floor(process.uptime());

        await sock.sendMessage(msg.key.remoteJid, {
            text: `⏱️ Bot Uptime: ${up} seconds`
        });
    }
};
