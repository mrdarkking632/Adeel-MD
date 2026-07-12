module.exports = {
    name: "speed",

    async execute(sock, msg) {

        const start = Date.now();

        await sock.sendMessage(msg.key.remoteJid, {
            text: `
⚡ Speed Test

🚀 Response:
${Date.now() - start} ms

🤖 Adeel-MD Online
`
        });
    }
};
