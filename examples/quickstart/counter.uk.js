function _tag_ngettext(n, args) {
  return args[+(n % 10 === 1 && n % 100 !== 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2)];
}

const {
  t,
  ngettext,
  msgid,
  addLocale,
  useLocale
} = require('ttag');

const locale = process.env.LOCALE;

if (locale) {
  const translationObj = require(`./${locale}.po.json`);

  addLocale(locale, translationObj);
  useLocale(locale);
}

function startCount(n) {
  console.log(`починаємо рахунок до ${n}`);

  for (let i = 0; i <= n; i++) {
    console.log(_tag_ngettext(i, [`минув ${i} тік`, `минуло ${i} тіка`, `минуло ${i} тіків`]));
  }
}

startCount(3);