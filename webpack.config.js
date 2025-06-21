/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const webpack = require('webpack');

const isProd = process.env.NODE_ENV === 'production';

module.exports = [
    {
        entry: './src/index.ts',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: isProd ? 'ttag.min.js' : 'ttag.js',
            libraryTarget: 'umd',
            globalObject: 'this',
        },
        devtool: false,
        module: {
            rules: [
                {
                    test: /\.(js|ts)$/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                        },
                    },
                    exclude: /node_modules/,
                },
            ],
        },
        resolve: {
            extensions: ['.js', '.ts'],
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
                },
            }),
        ],
    },
    {
        entry: './src/index.ts',
        devtool: false,
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: isProd ? 'ttag.esm.min.js' : 'ttag.esm.js',
            library: {
                type: 'module',
            },
        },
        experiments: {
            outputModule: true,
        },
        module: {
            rules: [
                {
                    test: /\.(js|ts)$/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [['@babel/preset-env', { targets: { esmodules: true } }]],
                        },
                    },
                    exclude: /node_modules/,
                },
            ],
        },
        resolve: {
            extensions: ['.js', '.ts'],
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
                },
            }),
        ],
    },
];
