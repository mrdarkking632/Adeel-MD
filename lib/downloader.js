const yts = require("yt-search");
const ytdl = require("@distube/ytdl-core");

async function search(query) {
    const result = await yts(query);

    if (!result.videos.length) {
        throw new Error("No video found");
    }

    return result.videos[0];
}

function isYoutube(url) {
    return ytdl.validateURL(url);
}

module.exports = {
    search,
    isYoutube
};
