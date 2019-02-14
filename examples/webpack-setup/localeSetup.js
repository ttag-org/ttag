import { addLocale, useLocale } from 'ttag';

if (process.env.NODE_ENV !== 'production') {
    const ukLocale = require('./uk.po');
    addLocale('uk', ukLocale);
    useLocale('uk');
}