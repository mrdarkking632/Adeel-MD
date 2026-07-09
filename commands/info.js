module.exports = {
  name: "info",
  async execute(sock, msg) {
    await sock.sendMessage(msg.key.remoteJid, {
      text: "🤖 Adeel-MD\nVersion: 1.0\nDeveloper: Adeel"
    });
  }
};
