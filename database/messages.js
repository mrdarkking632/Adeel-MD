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

function get(id) {
    return messages.get(id);
}
module.exports = {
    save,
    get
};
