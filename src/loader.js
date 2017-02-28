import fs from 'fs';
import path from 'path';
import gParser from 'gettext-parser';
import { regLocale } from './index';

export function loadLocale(locale, filepath) {
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

    if (filepath && typeof filepath === 'object') {
        return regLocale(locale, filepath);
    }

    throw new Error(`Unsupported filetype ${filepath}`);
}
