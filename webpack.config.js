const path = require('path');
const isProd = process.env.NODE_ENV === 'production';
module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: isProd ? 'c3po.min.js':  'c3po.js',
        libraryTarget: 'umd'
    },
    module: {
        rules: [
            {test: /\.(js|jsx)$/, use: 'babel-loader'}
        ]

    }
};