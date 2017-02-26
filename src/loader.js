import fs from 'fs';
import gParser from 'gettext-parser';
import { regLocale } from './index';

export function loadLocale(locale, moFilePath) {
    // TODO: implement detection (po or mo file).
    const moFile = fs.readFileSync(moFilePath);
    const data = gParser.mo.parse(moFile);
    regLocale(locale, data);
}
