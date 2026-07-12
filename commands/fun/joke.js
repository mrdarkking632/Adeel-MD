module.exports = {
    name: "joke",

    async execute(sock, msg) {
        await sock.sendMessage(msg.key.remoteJid, {
            text: "😂 Joke feature ready."
        });
    }
};
