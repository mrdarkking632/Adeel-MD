function serialize(msg) {
    return {
        id: msg.key.id,
        from: msg.key.remoteJid,
        sender: msg.key.participant || msg.key.remoteJid,
        pushName: msg.pushName || "User"
    };
}

module.exports = serialize;
