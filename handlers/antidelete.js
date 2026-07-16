const messageDB = require("../database/messages");

const OWNER = "923288835468@s.whatsapp.net";

async function antiDelete(sock, updates) {
    for (const update of updates) {

        if (!update.update?.message) continue;

        const msg = messageDB.get(update.key.id);
        if (!msg) continue;

        const sender = update.key.participant || update.key.remoteJid;

        // Ignore owner's deleted messages
        if (sender === OWNER) continue;

        const text =
            msg.message?.conversation ||
            msg.message?.extendedTextMessage?.text ||
            "📷 Media Message";

        await sock.sendMessage(update.key.remoteJid, {
            text:
`🚫 *ANTI DELETE*

👤 User: @${sender.split("@")[0]}

📝 Deleted Message:
${text}`,
            mentions: [sender]
        });
    }
}

module.exports = antiDelete;
