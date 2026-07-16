const messages = new Map();

function save(id, message) {
    messages.set(id, message);

    // also save protocol referenced messages
    if (message.message?.protocolMessage?.key?.id) {
        messages.set(
            message.message.protocolMessage.key.id,
            message
        );
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
