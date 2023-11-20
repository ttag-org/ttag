import fs from 'fs';
import path from 'path';
import gParser from 'gettext-parser';
import { addLocale } from '../src/index';
import { TTagTranslations, TTagCompactTranslations } from '../src/config';

export function loadFile(filepath: string) {
    const fileContent = fs.readFileSync(filepath);
    if (path.extname(filepath) === '.mo') {
        return gParser.mo.parse(fileContent);
    }

    if (path.extname(filepath) === '.po') {
        return gParser.po.parse(fileContent);
    }

    throw new Error(`Unsupported filetype ${filepath}`);
}

export function loadLocale(locale: string, filepath: string | TTagTranslations | TTagCompactTranslations) {
    if (typeof filepath === 'string') {
        return addLocale(locale, loadFile(filepath));
    }

    if (filepath && typeof filepath === 'object' && 'translations' in filepath && 'headers' in filepath) {
        return addLocale(locale, filepath);
    }

    throw new Error(`Unsupported filetype ${filepath}`);
}
