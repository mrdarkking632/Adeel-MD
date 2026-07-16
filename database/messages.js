const messages = new Map();

function save(id, message) {
    if (!message.message?.protocolMessage) {
        messages.set(id, message);
        console.log("SAVED ID:", id);
    }
}

function get(id) {
    console.log("SEARCH ID:", id);
    return messages.get(id);
}

module.exports = {
    save,
    get
};
