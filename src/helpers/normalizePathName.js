const normalizePath = (file) => {
    return file?.path?.replace(/\\/g, '/').replace(/^src\//, '');
}

module.exports = normalizePath