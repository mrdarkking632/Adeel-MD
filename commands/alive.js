module.exports = {
    name: "alive",

    async execute(sock, msg) {
        await sock.sendMessage(msg.key.remoteJid, {
            text: "🤖 Adeel Bot\n\n✅ Status: Online\n⚡ Speed: Fast\n👑 Owner: Adeel"
        });
    }
};
