const messages = new Map();

function save(id, message) {

    if (message.message?.protocolMessage) return;

    messages.set(id, message);

    if (message.key?.remoteJidAlt) {
        messages.set(
            message.key.remoteJidAlt + id,
            message
        );
    }

    console.log("SAVED ID:", id);
}

function get(id, update) {

    let msg = messages.get(id);

    if (msg) return msg;

    if (update?.key?.remoteJidAlt) {
        for (const [key, value] of messages) {
            if (key.includes(update.key.remoteJidAlt)) {
                return value;
            }
        }
    }

    return null;
}

module.exports = {
    save,
    get
};
