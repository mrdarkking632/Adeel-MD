const messageDB = require("../database/messages");

const OWNER = "923288835468@s.whatsapp.net";

async function antiDelete(sock, updates) {
    for (const update of updates) {

        if (!update.update?.messageStubType) continue;

        const deletedId =
    update.update?.key?.id ||
    update.update?.message?.protocolMessage?.key?.id ||
    update.key.id;

const msg = messageDB.get(deletedId, update);
console.log("DELETE ID:", deletedId);
console.log("FOUND MSG:", msg ? Object.keys(msg.message || {}) : "NOT FOUND");
        if (!msg) continue;

        const sender =
            update.key.remoteJidAlt ||
            update.update?.key?.remoteJidAlt ||
            update.key.remoteJid;

        // Owner delete ignore
        if (sender === OWNER) continue;

        let text =
            msg.message?.conversation ||
            msg.message?.extendedTextMessage?.text;

        if (!text) {
            if (msg.message?.imageMessage) {
                text = "🖼️ Image Message";
            } else if (msg.message?.videoMessage) {
                text = "🎥 Video Message";
            } else if (msg.message?.stickerMessage) {
                text = "🌟 Sticker Message";
            } else if (msg.message?.audioMessage) {
                text = "🎵 Audio Message";
            } else {
                text = "📷 Media Message";
            }
        }

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
