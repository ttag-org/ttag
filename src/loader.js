import fs from 'fs';
import path from 'path';
import gParser from 'gettext-parser';
import { addLocale } from './index';

export function loadLocale(locale, filepath) {
    if (typeof filepath === 'string') {
        const fileContent = fs.readFileSync(filepath);
        let data;
        if (path.extname(filepath) === '.mo') {
            data = gParser.mo.parse(fileContent);
            return addLocale(locale, data);
        }

        if (path.extname(filepath) === '.po') {
            data = gParser.po.parse(fileContent);
            return addLocale(locale, data);
        }

        throw new Error(`Unsupported filetype ${filepath}`);
    }

    if (filepath && typeof filepath === 'object' &&
        filepath.translations && filepath.headers) {
        return addLocale(locale, filepath);
    }

    throw new Error(`Unsupported filetype ${filepath}`);
}
