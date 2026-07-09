module.exports = {
    name: "menu",

    async execute(sock, msg) {
        await sock.sendMessage(msg.key.remoteJid, {
            text: "🤖 *Adeel Bot*\n\n📋 Commands:\n.ping\n.menu\n.alive"
        });
    }
};
