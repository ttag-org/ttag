"use strict";

var _ttag = require("ttag");

function _tag_ngettext(n, args) {
  return args[+(n % 10 === 1 && n % 100 !== 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2)];
}

var locale = process.env.LOCALE; // uk

if (locale) {
  var translationObj = require("./".concat(locale, ".po.json")); // will load uk.po.json


  (0, _ttag.addLocale)(locale, translationObj); // adding locale to ttag

  (0, _ttag.useLocale)(locale); // make uk locale active
}

function startCount(n) {
  console.log("\u043F\u043E\u0447\u0438\u043D\u0430\u0454\u043C\u043E \u0440\u0430\u0445\u0443\u043D\u043E\u043A \u0434\u043E ".concat(n));

  for (var i = 0; i <= n; i++) {
    console.log(_tag_ngettext(i, ["\u043C\u0438\u043D\u0443\u0432 ".concat(i, " \u0442\u0456\u043A"), "\u043C\u0438\u043D\u0443\u043B\u043E ".concat(i, " \u0442\u0456\u043A\u0430"), "\u043C\u0438\u043D\u0443\u043B\u043E ".concat(i, " \u0442\u0456\u043A\u0456\u0432")]));
  }
}

startCount(3);