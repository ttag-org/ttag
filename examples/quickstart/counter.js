import { t, ngettext, msgid, addLocale, useLocale } from 'c-3po';
import fs from 'fs';
import gt from 'gettext-parser';

function loadFile(filePath) {
    gt.po.parse(fs.readFileSync(filePath));
}

const locale = process.env.LOCALE;

if (locale) {
    const translationObj = loadFile(`${locale}.po`);
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
