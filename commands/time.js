module.exports = {
  name: "time",
  async execute(sock, msg) {
    const time = new Date().toLocaleString("en-PK", {
      timeZone: "Asia/Karachi"
    });

    await sock.sendMessage(msg.key.remoteJid, {
      text: "🕒 Pakistan Time:\n" + time
    });
  }
};
