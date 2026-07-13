const fs = require("fs");

const file = "./database/users.json";

function readDB() {
    if (!fs.existsSync(file)) {
        fs.writeFileSync(file, "{}");
    }

    return JSON.parse(fs.readFileSync(file));
}

function saveDB(data) {
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

module.exports = {
    readDB,
    saveDB
};
