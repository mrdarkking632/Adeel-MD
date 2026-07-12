module.exports = {
    name: "ping",

    async execute(sock, msg) {
        const start = Date.now();

        await sock.sendMessage(msg.key.remoteJid, {
            text: `🏓 Pong!\n\n⚡ Speed: ${Date.now() - start}ms\n🟢 Status: Online\n🤖 Adeel-MD`
        });
    }
};
