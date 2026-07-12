module.exports = {
    name: "gpt",

    async execute(sock, msg) {
        await sock.sendMessage(msg.key.remoteJid, {
            text: `
🧠 GPT AI

Use:
.gpt your question

🤖 AI Assistant Ready
`
        });
    }
};
