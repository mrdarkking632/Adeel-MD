module.exports = {
  name: "owner",
  async execute(sock, msg) {
    await sock.sendMessage(msg.key.remoteJid, {
      text: "👑 Owner: Adeel"
    });
  }
};
