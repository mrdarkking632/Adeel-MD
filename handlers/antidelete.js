const messageDB = require("../database/messages");

async function antiDelete(sock, updates) {
    for (const update of updates) {
        if (!update.update?.message) continue;

        const msg = messageDB.get(update.key.id);
        if (!msg) continue;

        const text =
            msg.message?.conversation ||
            msg.message?.extendedTextMessage?.text ||
            "📷 Media Message";

        await sock.sendMessage(update.key.remoteJid, {
            text: `🚫 *ANTI DELETE*\n\n👤 User: @${(update.key.participant || update.key.remoteJid).split("@")[0]}\n\n📝 Deleted Message:\n${text}`,
            mentions: [update.key.participant || update.key.remoteJid]
        });
    }
}

module.exports = antiDelete;
