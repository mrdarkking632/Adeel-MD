const messages = new Map();

function save(id, message) {

    // Delete notification save nahi karni
    if (message.message?.protocolMessage) {
        return;
    }

    messages.set(id, message);

    if (message.key?.id) {
        messages.set(message.key.id, message);
    }

    if (message.message?.imageMessage ||
        message.message?.videoMessage ||
        message.message?.conversation ||
        message.message?.extendedTextMessage) {

        messages.set(id, message);
    }

    if (messages.size > 1000) {
        const firstKey = messages.keys().next().value;
        messages.delete(firstKey);
    }
}

function get(id) {
    return messages.get(id);
}

module.exports = {
    save,
    get
};
