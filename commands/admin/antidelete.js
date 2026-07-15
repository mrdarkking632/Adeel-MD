let enabled = true;

module.exports = {
    name: "antidelete",

    async execute(sock, msg, args) {
        const option = (args[0] || "").toLowerCase();

        if (option === "on") {
            enabled = true;
        } else if (option === "off") {
            enabled = false;
        }

        await sock.sendMessage(msg.key.remoteJid, {
            text: `🗑️ Anti Delete ${enabled ? "Enabled ✅" : "Disabled ❌"}`
        });
    },

    isEnabled() {
        return enabled;
    }
};
