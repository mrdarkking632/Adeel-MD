const fs = require("fs");

function fileSize(file) {
    if (!fs.existsSync(file)) return 0;
    return fs.statSync(file).size;
}

module.exports = {
    fileSize
};
