import fs from 'fs';
import path from 'path';
import gParser from 'gettext-parser';
import { addLocale } from './index';

export function loadFile(filepath) {
    const fileContent = fs.readFileSync(filepath);
    if (path.extname(filepath) === '.mo') {
        return gParser.mo.parse(fileContent);
    }

    if (path.extname(filepath) === '.po') {
        return gParser.po.parse(fileContent);
    }

    throw new Error(`Unsupported filetype ${filepath}`);
}

export function loadLocale(locale, filepath, replaceVariablesNames = true) {
    if (typeof filepath === 'string') {
        return addLocale(locale, loadFile(filepath), replaceVariablesNames);
    }

    if (
        filepath && typeof filepath === 'object' &&
        filepath.translations && filepath.headers
    ) {
        return addLocale(locale, filepath, replaceVariablesNames);
    }

    throw new Error(`Unsupported filetype ${filepath}`);
}
