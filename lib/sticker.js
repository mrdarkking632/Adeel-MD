const fs = require("fs");
const path = require("path");

function tempFile(name) {
    return path.join(__dirname, "..", "temp", name);
}

module.exports = {
    tempFile
};
