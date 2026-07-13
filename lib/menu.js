const quotes = [
    "🚀 Dream Big.",
    "🔥 Never Give Up.",
    "👑 Stay Strong.",
    "⚡ Adeel-MD Premium.",
    "💙 Keep Learning."
];

function randomQuote() {
    return quotes[Math.floor(Math.random() * quotes.length)];
}

module.exports = {
    randomQuote
};
