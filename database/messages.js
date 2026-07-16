const messages = new Map();

function save(id, message) {

    // Ignore delete notifications
    if (message.message?.protocolMessage) return;

    const data = {
        id,
        message,
        timestamp: Date.now()
    };

    messages.set(id, data);

    if (message.key?.id) {
        messages.set(message.key.id, data);
    }

    if (messages.size > 1000) {
        const firstKey = messages.keys().next().value;
        messages.delete(firstKey);
    }
}

function get(id) {
    const data = messages.get(id);
    return data ? data.message : null;
}

module.exports = {
    save,
    get
};
