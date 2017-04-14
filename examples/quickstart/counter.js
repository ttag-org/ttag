import { ngettext, msgid, t,  addLocale, useLocale } from 'c-3po';
import { loadFile } from 'c-3po/loader';

const locale = process.env.LOCALE;

if (locale) {
	console.log('[dev mode]');
	const translationObj = loadFile(`${locale}.po`);
	addLocale(locale, translationObj);
	useLocale(locale);
}

function startCount(n){
	console.log(t`starting count up to ${n}`);
	for (let i = 0; i <= n; i++) {
		console.log(ngettext(msgid`${i} tick passed`, `${i} ticks passed`, i));
	}
}

startCount(3);