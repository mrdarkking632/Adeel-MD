const messages = new Map();

function save(id, message) {
    // Save normal message id
    messages.set(id, message);

    // Save protocol message referenced id
    const protocolKey = message.message?.protocolMessage?.key?.id;

    if (protocolKey) {
        messages.set(protocolKey, message);
    }

    // Save alternative id if available (LID mode)
    if (message.key?.id) {
        messages.set(message.key.id, message);
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
