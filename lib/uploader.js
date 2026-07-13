async function upload(buffer) {
    return {
        success: true,
        url: null,
        message: "Uploader module ready."
    };
}

module.exports = {
    upload
};
