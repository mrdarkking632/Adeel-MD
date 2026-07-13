const store = new Map();

function save(id, message) {
    store.set(id, message);
}

function get(id) {
    return store.get(id);
}

module.exports = {
    save,
    get
};
