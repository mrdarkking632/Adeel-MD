const messages = new Map();
const lastMessages = new Map();

function save(id, message) {

    if (message.message?.protocolMessage) return;

    messages.set(id, message);

    if (message.key?.remoteJid) {
        lastMessages.set(
            message.key.remoteJid,
            message
        );
    }

    console.log("SAVED ID:", id);
}

function get(id, jid) {

    let msg = messages.get(id);

    if (msg) return msg;

    if (jid && lastMessages.has(jid)) {
        return lastMessages.get(jid);
    }

    return null;
}

module.exports = {
    save,
    get
};
