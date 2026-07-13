const yts = require("yt-search");

async function search(query) {
    const result = await yts(query);

    if (!result.videos.length) return null;

    return result.videos[0];
}

module.exports = {
    search
};
