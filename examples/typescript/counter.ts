import { ngettext, msgid, t, addLocale, useLocale } from 'ttag';

const locale = process.env.LOCALE; // uk

if (locale) {
    const translationObj = require(`./${locale}.po.json`); // will load uk.po.json
    addLocale(locale, translationObj); // adding locale to ttag
    useLocale(locale); // make uk locale active
}


function startCount(n: number): void {
    console.log(t`starting count up to ${n}`);
    for (let i = 0; i <= n; i++) {
       console.log(
           ngettext(msgid`${i} tick passed`, `${i} ticks passed`, i)
        );
    }
}

startCount(3);
