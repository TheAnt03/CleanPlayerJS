const path = require('path');

module.exports = {
    mode: 'none',
    entry: './src/index.js',
    output: {
        filename: 'cleanPlayer.js',
        path: path.resolve(__dirname, 'dist'),
        library: 'CleanPlayer',
        libraryTarget: 'umd',
    },
};