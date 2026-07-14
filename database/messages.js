const messages = new Map();

function save(id, message) {
    messages.set(id, message);

    // limit (memory safe)
    if (messages.size > 500) {
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
