import './localeSetup';
import { ngettext, msgid, t } from 'ttag';
const content = document.getElementById('content');

const view = (hours, minutes, seconds) => {
    const hoursTxt = ngettext(msgid`${hours} hour`, `${hours} hours`, hours);
    const minutesTxt = ngettext(msgid`${minutes} minute`, `${minutes} minutes`, minutes);
    const secondsTxt = ngettext(msgid`${seconds} second`, `${seconds} seconds`, seconds);

    return `
    <h1>${ t`webpack with ttag localization demo` }</h1>
    <h2>${ t`Current time is` }</h2>
    <h3>${hoursTxt} ${minutesTxt} ${secondsTxt}</h3>
    `
};

setInterval(() => {
    const date = new Date();
    content.innerHTML = view(date.getHours(), date.getMinutes(), date.getSeconds());
}, 1000);

