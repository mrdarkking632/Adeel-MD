const welcomes = [
    "👋 Welcome to the group!",
    "🎉 Glad to have you here!",
    "💙 Adeel-MD welcomes you!",
    "🔥 Enjoy your stay!",
    "✨ Have a great time!"
];

function getWelcome() {
    return welcomes[Math.floor(Math.random() * welcomes.length)];
}

module.exports = {
    getWelcome
};
