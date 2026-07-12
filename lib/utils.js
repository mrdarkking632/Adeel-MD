const fs = require("fs");

module.exports = {
    exists: (file) => fs.existsSync(file),

    readJSON: (file) => {
        if (!fs.existsSync(file)) return {};
        return JSON.parse(fs.readFileSync(file));
    },

    writeJSON: (file, data) => {
        fs.writeFileSync(file, JSON.stringify(data, null, 2));
    }
};
