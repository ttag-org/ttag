'use strict';

var _c3po = require('c-3po');

var _loader = require('c-3po/loader');

function _tag_ngettext(n, args) {
	return args[+(n % 10 == 1 && n % 100 != 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2)];
}

var locale = process.env.LOCALE;

if (locale) {
	console.log('[dev mode]');
	var translationObj = (0, _loader.loadFile)(locale + '.po');
	(0, _c3po.addLocale)(locale, translationObj);
	(0, _c3po.useLocale)(locale);
}

function startCount(n) {
	console.log('\u043F\u043E\u0447\u0438\u043D\u0430\u0454\u043C\u043E \u0440\u0430\u0445\u0443\u043D\u043E\u043A \u0434\u043E ' + n);
	for (var i = 0; i <= n; i++) {
		console.log(_tag_ngettext(i, ['\u043C\u0438\u043D\u0443\u0432 ' + i + ' \u0442\u0456\u043A', '\u043C\u0438\u043D\u0443\u043B\u043E ' + i + ' \u0442\u0456\u043A\u0430', '\u043C\u0438\u043D\u0443\u043B\u043E ' + i + ' \u0442\u0456\u043A\u0456\u0432']));
	}
}

startCount(3);
