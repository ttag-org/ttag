module.exports = ({ extract, locale }={}) => {
    const c3po = {};

    if (extract) {
        c3po.extract = { output: 'template.pot'}
    }

    if (locale) {
        c3po.resolve = { translations: `${locale}.po` };
    }

    return {
        entry: './app.js',
        output: {
            filename: locale ? `./dist/${locale}/app.js` : './dist/app.js'
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    use: {
                    loader: 'babel-loader',
                    options: {plugins: [['c-3po', c3po]]}
                }
                }
            ]
        }
    }
};
