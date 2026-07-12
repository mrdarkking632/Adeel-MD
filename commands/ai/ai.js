module.exports = {
    name: "ai",

    async execute(sock, msg) {
        await sock.sendMessage(msg.key.remoteJid, {
            text: `
🤖 AI Assistant

Use:
.ai your question

🧠 AI system ready...

⚡ Adeel-MD
`
        });
    }
};
