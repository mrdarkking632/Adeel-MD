function formatViews(views) {
    return Number(views).toLocaleString();
}

function formatDuration(duration) {
    return duration || "Unknown";
}

function reply(text) {
    return {
        text
    };
}

module.exports = {
    formatViews,
    formatDuration,
    reply
};
