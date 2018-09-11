const { t, ngettext, msgid, addLocale, useLocale } = require('ttag');

const locale = process.env.LOCALE;

if (locale) {
    const translationObj = require(`./${locale}.po.json`);
    addLocale(locale, translationObj);
    useLocale(locale);
}

function startCount(n) {
    console.log(t`starting count up to ${n}`);
    for (let i = 0; i <= n; i++) {
        console.log(ngettext(msgid`${i} tick passed`, `${i} ticks passed`, i));
    }
}

startCount(3);
