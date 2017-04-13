const webpack = require('webpack');

module.exports = ({ extract } = {}) => { // webpack 2 can accept env object
    const c3po = {};

    if (extract) {
        c3po.extract = { output: 'template.pot'} // translations will be extracted to template.pot
    }

    const rules = [
        {
            test: /\.(js|jsx)$/,
            use: {
                loader: 'babel-loader',
                options: { plugins: [['c-3po', c3po]] }
            }
        }
    ];

    if (process.env.NODE_ENV !== 'production') {
        rules.push(
            { test: /\.po$/, loader: 'json-loader!po-gettext-loader' }
        );
    }

    return {
        entry: './app.js',
        output: {
            filename: './dist/app.js'
        },
        module: { rules },
        plugins: [
            new webpack.DefinePlugin(
                { 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'debug') }
            )
        ]

    }
};