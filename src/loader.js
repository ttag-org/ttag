import fs from 'fs';
import path from 'path';
import gParser from 'gettext-parser';
import { regLocale } from './index';

export function loadLocale(locale, filepath) {
    // TODO: implement detection (po or mo file).
    if (typeof filepath === 'string') {
        const fileContent = fs.readFileSync(filepath);
        let data;
        if (path.extname(filepath) === '.mo') {
            data = gParser.mo.parse(fileContent);
            return regLocale(locale, data);
        }

        if (path.extname(filepath) === '.po') {
            data = gParser.po.parse(fileContent);
            return regLocale(locale, data);
        }

        throw new Error(`Unsupported filetype ${filepath}`);
    }
    return undefined;
}
