const { saveContact } = require("../lib/googleContacts");

const saved = new Set();

async function autoSaveContact(sock, msg) {
    try {
        if (!msg.key || msg.key.fromMe) return;

        const jid =
            msg.key.remoteJidAlt ||
            msg.key.participantAlt ||
            msg.key.remoteJid;

        if (!jid || !jid.endsWith("@s.whatsapp.net")) return;

        const number = "+" + jid.split("@")[0];

        if (saved.has(number)) return;

        const name = msg.pushName || number;

        await saveContact(number, name);

        saved.add(number);

    } catch (e) {
        console.log("Auto Save Error:", e.message);
    }
}

module.exports = autoSaveContact;
